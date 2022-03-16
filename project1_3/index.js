import axios from 'axios'
import express from 'express'
const app = express()
const Data_1 = 'http://3.1.189.234:8091/data'


const init = async() =>{
    const API1 = axios.get(`${Data_1}/ttntest`)

    //destructuring
    const [ttntest] = await Promise.all([API1])

       var maindata= ttntest.data
       var dataArray =[]
       var dataArray2=[]
       //return property
       var size = Object.keys(maindata).length
       
       
       for(let i=0;i<size;i++){
           var x = maindata
           dataArray.push(x[i].data)
       
           
       }
    //    console.log(Math.max(...dataArray))
       var k=200 
       for(let i=0;i<size;i+=200){
           var a= dataArray.slice(i,k)
           dataArray2.push(a)
           k+=200
       }
    //avgminmax check
    let arr_3 = []
    let arr_2 = []
    let arr = []
   
    for(let i=0;i<dataArray2.length;i++){
        arr.push(Math.max(...dataArray2[i]))
        arr_2.push(Math.min(...dataArray2[i]))
        arr_3.push(eval(...dataArray2[i].join('+'))/dataArray2[i].length)
       
    };
    //data lastest set
    let arr_4 = (dataArray.splice(28000,88))
    //get last array data
    let arr_5 = []
    for(let i=0;i<=88;i++){
        arr_5.push(i)
    }
    
    //linear regression
        let x_re = arr_5 //data
        let y_re = arr_4 //0.48
        var lr = {};
        const n = arr_4.length;
        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_xx = 0;
        var sum_yy = 0;

        for (var i = 0; i < arr_4.length; i++) {

            sum_x += x_re[i];
            sum_y += y_re[i];
            sum_xy += (x_re[i]*y_re[i]);
            
            sum_xx += (x_re[i]*x_re[i]);
            sum_yy += (y_re[i]*y_re[i]);
        } 
        
        lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
        lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
        
        
        // console.log(lr)
        //PREDICT
        var Y_new = 'Data in 1 day is =>>>' + (lr['slope']*89 + lr['intercept'])  + '    ' + 'Data in 7 day is =>>>' + (lr['slope']*95 + lr['intercept']) 
            
            
            
  
        
  
        
        //show result
        

       
    app.get('/', (req,res) =>{
        res.json(dataArray2)
    })
         
    app.get('/max',(req,res)=>{
        res.json(arr);
    })
    app.get('/min',(req,res)=>{
        res.json(arr_2);
    })
    app.get('/avg',(req,res)=>{
        res.json(arr_3);
    })
    app.get('/predict',(req,res)=>{
        res.json(Y_new);
    })

    app.listen(3000, ()=> {
        console.log('App listen on port 3000')
    })        

        
}

init()


