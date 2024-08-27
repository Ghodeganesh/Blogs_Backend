const express = require("express")
const fs = require("fs")
const { dirname } = require("path")
const app = express()
const port = 4000
const path = __dirname + "/users.json"

app.use(express.json())
let users = []

app.get("/users", (req, res) => {
    try {
        fs.readFile(path, { encoding: "utf-8" }, (err, users) => {
            // users = users ? JSON.parse({users}) : []
            data = users ? JSON.parse(users) : []

            return res.status(200).json({
                success: 'true',
                message: "users fetches succesfully!",
                data
            })
        })


    } catch (error) {
        return res.status(500).json({
            success: "false",
            message: "unable to fetch users"
        })
    }
})

app.post("/users", (req, res) => {
    try {
        fs.readFile(path, { encoding: "utf-8" }, (err, users) => {
            // users = users ? JSON.parse({users}) : []
            users = users ? JSON.parse(users) : []
            // console.log(data)
            // console.log(users)
            users.push({ ...req.body, id: users.length + 1 })
            const data = req.body
            fs.writeFile(path, JSON.stringify(users), { encoding: "utf-8" }, (err, users) => {
                if (err) {
                    res.status(500).json({
                        message: "please try again"
                    })
                } else {
                    return res.status(201).json({
                        success: 'true',
                        message: "user added succesfully!",
                        data: data

                    })
                }
            })
        })
    } catch (error) {
        return res.status(500).json({
            success: "false",
            message: "unable to add users"
        })
    }
})

app.get("/users/:id", (req, res) => {

    try {

        fs.readFile(path, { encoding: "utf-8" }, (err, users) => {
            users = users ? JSON.parse(users) : []

            const user = users.filter(data => data.id == req.params.id)

            if (user.length !== 0) {
                return res.status(200).json({
                    success: "true",
                    message: "user found succesfully",
                    user
                })
            }
            else {
                return res.status(500).json({
                    success: "false",
                    message: "user not found "
                })
            }

        })


    } catch (error) {
        return res.status(500).json({
            success: "false",
            message: "unable to find user"
        })
    }

})


app.put("/users/:id", (req, res) => {
    try {
        fs.readFile(path, { encoding: "utf-8" }, (err, users) => {
            users = users ? JSON.parse(users) : []
            const index = users.findIndex(data => data.id == req.params.id)
            users[index] = { ...users[index], ...req.body }


            fs.writeFile(path, JSON.stringify(users), { encoding: "utf-8" }, (err) => {
                if (err) {
                    return res.status(500).send({ "message": "please try again!!" })
                } else {
                    return res.status(200).json({ "massge": "user updated succesfully!!" })
                }
            })
        }
        )

    }
    catch (error) {
        return res.status(500).json({
            success: "false",
            message: "unable to Update users Data"
        })
    }
})

app.delete("/users/:id", (req, res) => {
    try {
        fs.readFile(path, { encoding: "utf-8" }, (err, users) => {
            // users = users ? JSON.parse({users}) : []
            users = users ? JSON.parse(users) : []

            const user = users.filter(data => data.id != req.params.id)
            let deletedUser = users.filter(data => data.id == req.params.id)
            users = [...user]

            fs.writeFile(path, JSON.stringify(users), { encoding: "utf-8" }, (err) => {
                if (err) {
                    return res.status(500).send({ "message": "please try again!!" })
                } else {
                    return res.status(200).json({
                        success: "true",
                        message: "user deleted succesfully",
                        deletedUser
                    })
                }
            })
        })

    } catch (error) {
        return res.status(500).json({
            success: "false",
            message: "unable to delete user "
        })
    }
})



app.listen(port, () => {
    console.log(`Server listen on ${port}`)


})