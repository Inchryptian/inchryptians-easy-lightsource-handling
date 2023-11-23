export const lightSourceHandlingSettings = [
    {
        settingName: "ddbItems",
        settingObject: {
            name: "DDB Items",
            config: true,
            type: Boolean,
            restricted: true,
            default: false,
            scope: "world"
        }
    }, {
        settingName: "adminMode",
        settingObject: { name: "Admin Mode",
            config: true,
            type: Boolean,
            restricted: true,
            default: false,
            scope: "world"}
    }, {
        settingName: "lightRequestsForAdmin",
        settingObject: { name: "Light Requests for Admin",
            config: true,
            type: Boolean,
            restricted: true,
            default: false,
            scope: "world"}
    }, {
        settingName: "lightColor",
        settingObject: { name: "Player Light Source Color",
            config: true,
            type: String,
            restricted: true,
            default: "#f98026",
            scope: "world"}
    }
]