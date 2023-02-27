/////find
export const findOne = async ({ model, filter = {}, select = "", populate = [] } = {}) => {
    //name argument
    const result = await model.findOne(filter).select(select).populate(populate)

    return result


}
export const find = async ({ model, filter = {}, select = "", populate = [], skip = 0, limit = 10 } = {}) => {
    //name argument
    const result = await model.find(filter).skip(skip).limit(limit).select(select).populate(populate)

    return result


}
export const findById = async ({ model, filter = {}, select = "", populate = [] } = {}) => {
    //name argument
    const result = await model.findById(filter).select(select).populate(populate)

    return result


}



//////update
export const findOneAndUpdate = async ({ model, filter = {}, data = {}, options = {}, select = "", populate = [] } = {}) => {
    //name argument
    const result = await model.findOneAndUpdate(filter, data, options).select(select).populate(populate)

    return result


}
export const findByIdAndUpdate = async ({ model, filter = {}, data = {}, options = {}, select = "", populate = [] } = {}) => {
    //name argument
    const result = await model.findByIdAndUpdate(filter, data, options).select(select).populate(populate)

    return result


}
export const Updateone = async ({ model, data = {}, select = "", populate = [] } = {}) => {
    //name argument
    const result = await model.UpdateOne(filter, data)

    return result


}

//////Delete
export const findOneAndDelete = async ({ model, filter = {}, data = {}, select = "", populate = [] } = {}) => {
    //name argument
    const result = await model.findOneAndDelete(filter, data).select(select).populate(populate)

    return result


}
export const findByIdAndDelete = async ({ model, filter = {}, data = {}, select = "", populate = [] } = {}) => {
    //name argument
    const result = await model.findByIdAndDelete(filter, data).select(select).populate(populate)

    return result


}
export const Deleteone = async ({ model,filter={}, data = {}, select = "", populate = [] } = {}) => {
    //name argument
    const result = await model.DeleteOne(filter, data)

    return result


}
///////create
export const create = async ({ model, data = {}, select = "", populate = [] } = {}) => {
    
    const result = await model.create(data)

    return result


}
export const createandsave = async ({ model, data = {} } = {}) => {
    //name argument
    const newuser = new model(data)
    const saveduser= await newuser.save()
    return saveduser


}
export const insertmany = async ({ model, data =[{}] } = {}) => {
    const result = await model.insertmany(data)

    return result  
}
