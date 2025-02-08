import { defineType } from "sanity"

export const orders = defineType({
    name: "order",
    title: "Orders",
    type: "document",
    fields: [
       
        {
            name: "status",
            title: "Status",
            type: "string"
        }
    ]
})