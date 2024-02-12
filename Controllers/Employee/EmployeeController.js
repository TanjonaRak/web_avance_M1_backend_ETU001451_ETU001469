

const { getClient } = require('../../Utility/db');
const EmployeeModel = require('../../models/Employe/Employee');

class EmployeeController {

    async SaveEmployee(req,res){
        try {
            // console.log(req)
            const employee = {...req.body}
            console.log(employee)
            const Emp = await EmployeeModel.SaveEmployee(employee);
            res.status(200).send({Emp,status:200});
        } catch (error) {
            res.status(500).send({message:error.message,status:500})
        }
    }

    async getEmployee (req,res){
        let client = null;
        try {
            let offset = req.params._offset;
            let limit = req.params._limit
            client = await getClient();
            let db = client.db(process.env.DB_NAME); 
            const data = await EmployeeModel.getEmployee(db,offset,limit);
            const lineNumber = await EmployeeModel.getLigneNumber(db,limit);
            res.status(200).send({data,status:200,message:"request success",lineNumber:lineNumber});
        } catch (error) {
            res.status(500).send({message:error.message,status:500})
        }finally{
            if (client!=null) {
                client.close();
            }
        }
    }

    async UpdateEmployee(req,res){  
        try {
            // let _id = req.params._id
            let emp_update = {...req.body};
            const data_update = await EmployeeModel.UpdateEmployee(emp_update,null);
            res.status(200).send({data_update,status:200,message:"request success"});
        } catch (error) {
            res.status(500).send({message:error.message,status:500})
        }
    }
} 

module.exports = new EmployeeController();