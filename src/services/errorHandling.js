export function asynchandiler(fn) {
    return (req, res, next) => {

        fn(req, res, next).catch(err => {

            // res.status(500).json({ massege: "catch error", errmes: err.message, stack: err.stack })
            next(new Error(err, { cause: 500 }))
        })


    }

}


export const GEH = (err, req, res, next) => {
    if (err) {
        if (process.env.mood === "DEV") {
            res.status(err['cause' ]|| 500).json({ err: err.message, stack: err.stack })

        } else {
            res.status(err['cause'] || 500).json({ err: err.message })

        }

    }
}