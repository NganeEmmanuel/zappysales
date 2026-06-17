package com.zappysales.backend.config;

import tools.jackson.databind.ObjectMapper;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Servlet filter that implements lightweight in-memory IP-based rate limiting.
 */
@Component
public class RateLimitingFilter implements Filter {

    private final int capacity;
    private final int timeWindowSeconds;
    private final ObjectMapper objectMapper;
    private final Map<String, IpRequestTracker> ipTrackers = new ConcurrentHashMap<>();

    /**
     * Constructs a RateLimitingFilter with configurations and ObjectMapper.
     *
     * @param capacity          the max requests allowed per time window
     * @param timeWindowSeconds the time window duration in seconds
     * @param objectMapper      the Jackson object mapper for JSON serialization
     */
    public RateLimitingFilter(
            @Value("${app.rate-limit.capacity:100}") int capacity,
            @Value("${app.rate-limit.time-window-seconds:60}") int timeWindowSeconds,
            ObjectMapper objectMapper) {
        this.capacity = capacity;
        this.timeWindowSeconds = timeWindowSeconds;
        this.objectMapper = objectMapper;
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // No initialization required
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        if (request instanceof HttpServletRequest httpRequest && response instanceof HttpServletResponse httpResponse) {

            String clientIp = getClientIp(httpRequest);
            long now = System.currentTimeMillis();
            long timeWindowMs = timeWindowSeconds * 1000L;

            boolean isAllowed = ipTrackers.compute(clientIp, (ip, tracker) -> {
                if (tracker == null || now - tracker.windowStartTimestamp > timeWindowMs) {
                    return new IpRequestTracker(now, 1);
                }
                return new IpRequestTracker(tracker.windowStartTimestamp, tracker.requestCount + 1);
            }).requestCount <= capacity;

            if (!isAllowed) {
                sendRateLimitExceededResponse(httpRequest, httpResponse);
                return;
            }
        }
        chain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isEmpty()) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }

    private void sendRateLimitExceededResponse(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        response.setStatus(429);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Map<String, Object> errorBody = new LinkedHashMap<>();
        errorBody.put("timestamp", Instant.now().toString());
        errorBody.put("status", 429);
        errorBody.put("error", "Too Many Requests");
        errorBody.put("message", "API request limit exceeded. Please try again later.");
        errorBody.put("path", request.getRequestURI());

        String json = objectMapper.writeValueAsString(errorBody);
        response.getWriter().write(json);
    }

    @Override
    public void destroy() {
        // No clean-up required
    }

    /**
     * Clears all tracked IP addresses and request counts.
     * Primarily used for testing purposes to reset the rate limiter state.
     */
    public void reset() {
        this.ipTrackers.clear();
    }

    /**
         * Inner helper class to hold request statistics for an IP address.
         */
        private record IpRequestTracker(long windowStartTimestamp, int requestCount) {
    }
}
