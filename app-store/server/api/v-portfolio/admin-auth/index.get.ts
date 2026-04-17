export default defineEventHandler(async (event) => {
    return {
        "data": {
            "id": 105,
            "name": "rb0",
            "email": "rb0@gmail.com",
            "email_verified_at": null,
            "active": 1,
            "status": "approved",
        },
        "message": "Data successful requested.",
        "code": 200
    }
})