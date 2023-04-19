import mongoose from "mongoose";
const otherinf = mongoose.Schema({
     defpercent:{
        type:Number
     },
     currentsem:{
        type:String
     },
     totalmonthinsem:{
        type:[{}]
     },
     upgradeyear:{
        type:Boolean
     },
     startoddsem:{
        type:Boolean
     },
     startevensem:{
        type:Boolean
     }
});

export default mongoose.model("Otherinf",otherinf);