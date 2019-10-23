class Request{
    getById(url){
        let html = `<h1 class="green">Notice</h1>  
        `
        fetch(url)
        .then(data => data.json())
        .then(data => {
            let l = 0;
            console.log(data)
                console.log(data.data.Notice);
                html += `
                <div class="card" style="width: 50rem;">
                <div class="card-body">
                  <h5 class="card-title">Topic: ${data.data.Notice.topic}</h5>
                  <p class="card-text">${data.data.Notice.description}</p>
                  <p>Month: ${data.data.Notice.month}</p>
                  <p>Week: ${data.data.Notice.week}</p>
                  <p>Day: ${data.data.Notice.day}</p>
                  <p>Submssion Date: ${data.data.Notice.submissionDate} </p>
                </div>
                </div>
                `
            document.getElementById('notices').innerHTML = html;
        })
        .catch(error => console.log(error))
    }

    getAll(url){
        let html = `<h1 class="green">Notices</h1>  
        `
        let option = '';
        fetch(url)
        .then(data => data.json())
        .then(data => {
            let l = 0;
            console.log(data)
            while(l < data.data.Notices.length){
                console.log(data.data.Notices[l]);
                html += `
                <div class="card" style="width: 50rem;">
                <div class="card-body">
                  <h5 class="card-title">Topic: ${data.data.Notices[l].topic}</h5>
                  <p class="card-text">${data.data.Notices[l].description}</p>
                  <p>Month: ${data.data.Notices[l].month}</p>
                  <p>Week: ${data.data.Notices[l].week}</p>
                  <p>Day: ${data.data.Notices[l].day}</p>
                  <p>Submssion Date: ${data.data.Notices[l].submissionDate} </p>
                </div>
                </div>
                `
                option += `<option value="${data.data.Notices[l].id}">${data.data.Notices[l].id} - ${data.data.Notices[l].topic}</option>`
                l++;
            }
            document.getElementById('notices').innerHTML = html;
            document.getElementById('opitons').innerHTML = option;
        })
        .catch(error => console.log(error))
    }

    postRequest(url,data){
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query: `mutation{
                createNotice(
                    topic: "${data.topic}",
                    day: ${data.day},
                    month: ${data.month},
                    week: 5,
                    description: "${data.description}") {topic}
                }`
            })
        })
        .then(data => data.json())
        .then(data => {
            console.log(data)
            alert("Notice Saved!")
        })
        .catch(err => console.log(err))
    }

    // get form data
    getFormData(){
        let formElements = document.getElementsByTagName('form')[0].elements;
        let topic = formElements.topic.value;
        let description = formElements.description.value;
        let date = formElements.date.value;

        const json = {
            topic,
            description,
            month: date.split("-")[1],
            day: date.split("-")[2],
            week: 1
        }
        return json;
    }
}

let request = new Request();
console.log(document.getElementById('noticeForm'))
document.getElementById('noticeForm').addEventListener('submit', e => {
    e.preventDefault();
    request.postRequest(`http://localhost:4000/graphql`,request.getFormData());
})


