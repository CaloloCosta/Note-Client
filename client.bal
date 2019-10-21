//import ballerina/log;
import ballerina/http;
// import ballerina/docker;
import ballerina/io;
import ballerina/lang.'int as ints;



// Type definition for notice 
type Notice record {
    string topic;
    string description;
    int day;
    int week;
    int month;
    string submissionDate;
};

// Type definition for notice in case of update
type upNotice record {
    int id;
    string description;
    int day;
    int week;
    int month;
    string submissionDate;
};



http:Client clientEP = new ("http://localhost:4000/graphql");


public function main() {
    //getNotices();
    getNotice(2);
    //postRequest("Ballerina Ckient","test from ballerina",1,2,2, "ss");
   
}


//Making a call to graphql to list all notices
function getNotices(){
    var resp = clientEP->get("?query={Notices{topic,id}}");
    if (resp is http:Response) {
        json|error payload = resp.getJsonPayload();
        if(payload is json){
            io:println("Response: ",payload);
        }
    } else {

        io:println("Something went wrong"+resp.toString());
    }
}

//Making a call to graphql to list one notec
function getNotice(int id){
    var resp = clientEP->get("?query={Notice(id: 1){topic,id}}");
    if (resp is http:Response) {
        json|error payload = resp.getJsonPayload();
        if(payload is json){
            io:println("Response: ",payload);
        }
        else{
            io:println(payload);
        }
    } else {

        io:println("Something went wrong"+resp.toString());
    }
}

 // making call to post request
function postRequest(string t, string d, int dy, int w, int m, string sd){

    json notice = {
        "topic": t, 
        "description": d, 
        "day": dy, 
        "week": w, 
        "month": m
    };

    http:Request ManagerReq = new;
    ManagerReq.setJsonPayload(<@untainted>notice);
    http:Response|error res = clientEP->post("?query=mutation{createNotice(topic: \""+t+"\", description: \""+d+"\"){id,topic,description}",ManagerReq);

    if(res is http:Response){
        var payload = res.getJsonPayload();
        if (payload is json) {
            io:println("Response: ",payload);
        } else {
            io:println(payload.detail());
        }
    } else {
        io:println("Something went wrong"+res.toString());
    }
}
