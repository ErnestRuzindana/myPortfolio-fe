const submitComment = document.getElementById("submitComment");

submitComment.addEventListener("click", (event) =>{
    event.preventDefault(); 

    comment();
});

const post_id = localStorage.getItem("postId")
async function comment(){
    const commentBody = document.getElementById("commentBody");
    
    //LoggedIn user
    const getData = {
        method: "GET",
        headers: {"auth_token": JSON.parse(sessionStorage.getItem("token"))}
    }

    let response = await fetch("http://localhost:5000/login/loggedInUser", getData)
    const fetchedData = await response.json()
    console.log(fetchedData)

    const commentorNames = fetchedData.firstName +" "+ fetchedData.lastName

    var commentorPicture
    var commentorImageTemplate;

    if(fetchedData.imageLink){
        commentorPicture = `http://localhost:5000/images/${fetchedData.imageLink}`
        commentorImageTemplate = 
           `<img src="${commentorPicture}" alt="" class="AuthorImage" id="authorProfilePicture">`
    }

    else{
        commentorPicture = fetchedData.firstName.charAt(0)+fetchedData.lastName.charAt(0)
        commentorImageTemplate = 
        ` <div class="authorImageCharts" id="authorImageCharts">
        ${fetchedData.firstName.charAt(0)+fetchedData.lastName.charAt(0)}
        </div>`
    }

    //Date Created
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var yyyy = today.getFullYear();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = monthNames[today.getMonth()]
    today = month + ' ' + dd + ', ' + yyyy;


    //picture template

    const data = {
        commentBody: commentBody.value, 
        commentorName: commentorNames,
        commentorImage: commentorPicture,
        dateCommented: today
    }

    const sendData = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: new Headers({"auth_token": JSON.parse(sessionStorage.getItem("token")), 'Content-Type': 'application/json; charset=UTF-8'})
    }

    fetch("http://localhost:5000/createComment/"+post_id, sendData)
.then(response => response.json())
.then((fetchedData)=>{
    console.log(fetchedData)

    
})


// Highlight Comment

var comment = $('.commentar').val();
  el = document.createElement('li');
  el.className = "box_result row";
  el.innerHTML =
  `
  <li class="box_result row">
  <div class="avatar_comment col-md-1">
      ${commentorImageTemplate}
  </div>
  <div class="result_comment col-md-11">
      <h4>${commentorNames} <span> &nbsp &nbsp/ ${today}</span></h4>
      <p>${comment}</p>
      <div class="tools_comment">
          <a class="like">Like</a>
          <span aria-hidden="true"> · </span>
          <a class="replay">Reply</a>
          <span aria-hidden="true"> · </span>
          <i class="fa fa-thumbs-o-up"></i> <span class="count">0</span> 
          <span aria-hidden="true"> · </span>
          <span>26m</span>
      </div>
      <ul class="child_replay"></ul>
  </div>
</li>
`
	document.getElementById('list_comment').append(el);
	$('.commentar').val('');
}



