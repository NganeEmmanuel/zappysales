# User Navigation Flow

```mermaid
flowchart LR

    USERLIST["User List"]

    PROFILE["User Details"]

    ADD["Add Address"]

    EDIT["Edit Address"]

    DELETE["Delete Address"]

    SAVE["Save Changes"]

    SUCCESS["Success Notification"]

    USERLIST --> PROFILE

    PROFILE --> ADD

    PROFILE --> EDIT

    PROFILE --> DELETE

    ADD --> SAVE

    EDIT --> SAVE

    DELETE --> SAVE

    SAVE --> SUCCESS
```