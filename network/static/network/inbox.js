let id_post_global = -1;
var rs = getComputedStyle(document.querySelector(":root"));
let elem;
var pos = 0;
var id = null;

var url = window.location.pathname;
document.addEventListener('DOMContentLoaded', function(){
  
    elem = document.getElementById("lookup-form");  
    elem.style.top = "0px";
    newurl = url.split('/');
    if(!newurl[1]){
        
        newurl = "index/%20/0/1";
        window.location.href += newurl;
    }
    else if(newurl[2]){
        if (performance.getEntriesByType("navigation")[0].type == "reload") {
            newurl[2] = "%20";
            newurl = newurl.join('/');
            window.location.href = newurl;
        }else{
            if(newurl[2] != "%20"){
                document.getElementById("search").value=newurl[2];
                document.querySelector(".search-text").focus();
                document.querySelector('#nav-search svg path').style.fill = rs.getPropertyValue("--blue-color");
                elem.style.top = "90px";
                elem.style.opacity = 1;
                load_postbox('search bar',null);
            }
        }
    }
    const input = document.getElementById("search");
    document.getElementById("lookup-form").onsubmit = searching;
    document.querySelector("#submitSearch").addEventListener("click", searching);
    if(document.querySelector('#new_post'))
        document.querySelector('#new_post').addEventListener('click', () => load_postbox('new post',null));
    if(document.querySelector('#nav-search') && newurl[2])
        document.querySelector('#nav-search').addEventListener('click', () => load_postbox('search bar', "button_nav_search"));
    else{
        document.querySelector("#nav-search").classList.toggle("hide");
    }
    if(document.querySelector('#all_posts_view')){
        document.querySelector('#all_posts_view').style.display = 'block';
        document.querySelector('#edit_profile_view').style.display = 'none';
        document.querySelector('#nav-home svg path').style.fill = rs.getPropertyValue("--green-color");
        if(document.querySelector('#nav-liked-posts svg path'))
            document.querySelector('#nav-liked-posts svg path').style.fill = rs.getPropertyValue("--black-logo");
        if(document.querySelector('#nav-following svg path'))
            document.querySelector('#nav-following svg path').style.fill = rs.getPropertyValue("--black-logo");
    }
    var pathArray = window.location.pathname.split('/');
    if(pathArray[1] == "following"){
        document.querySelector('#nav-following svg path').style.fill = rs.getPropertyValue("--yellow-color");
        document.querySelector('#nav-liked-posts svg path').style.fill = rs.getPropertyValue("--black-logo");
        document.querySelector('#nav-home svg path').style.fill = rs.getPropertyValue("--black-logo");
    }
    else if(pathArray[1] == "liked_posts"){
        document.querySelector('#nav-liked-posts svg path').style.fill = rs.getPropertyValue("--pink-color");
        document.querySelector('#nav-following svg path').style.fill = rs.getPropertyValue("--black-logo");
        document.querySelector('#nav-home svg path').style.fill = rs.getPropertyValue("--black-logo");
    }
    else if(pathArray[1] == "profile"){
        if(document.querySelector('#nav-following svg path'))
            document.querySelector('#nav-following svg path').style.fill = rs.getPropertyValue("--black-logo");
        if(document.querySelector('#nav-liked-posts svg path'))
            document.querySelector('#nav-liked-posts svg path').style.fill = rs.getPropertyValue("--black-logo");
        if(document.querySelector('#nav-home svg path'))
            document.querySelector('#nav-home svg path').style.fill = rs.getPropertyValue("--black-logo");
    }
    const image_input = document.querySelector("#change_profile_picture");
    image_input.addEventListener("change", function(e) {
        if (e.target.files) {
            let imageFile = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = document.createElement("img");
                img.onload = function (event) {
                    // Dynamically create a canvas element
                    var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");
                    // Actual resizing
                    ctx.drawImage(img, 0, 0, 300, 160);
                    var dataurl = canvas.toDataURL(imageFile.type);
                    document.getElementById("display-image").src = dataurl;
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(imageFile);
            if(document.getElementById("no_profile_picture_background")){
                document.getElementById("no_profile_picture_background").style.display="none";
                document.getElementById("display-image").style.opacity=1;
            }
        }
    });
})
function load_postbox(postbox, user_log){
    if(postbox === 'new post'){
        if(document.querySelector('#new_post_view')){
            if(document.querySelector('.modal').style.display === 'block'){
                document.querySelector('#new_post_view').style.display = 'none';
                document.querySelector('.modal').style.display = 'none';
                unLockScroll();
            }
            else{
                document.querySelector('.modal').style.display = 'block';
                document.querySelector('#new_post_view').style.display = 'block';
                document.querySelector('body').style.overflowy = 'hidden';
                lockScroll()
            }
            document.querySelector('#nav-following svg path').style.fill = rs.getPropertyValue("--black-logo");
            document.querySelector('#nav-home svg path').style.fill = rs.getPropertyValue("--black-logo");
            document.querySelector('#nav-liked-posts svg path').style.fill = rs.getPropertyValue("--black-logo");
            document.querySelector('#nav-search svg path').style.fill = rs.getPropertyValue("--black-logo");
        }
        document.getElementById("compose-body").focus();
        document.querySelector('form').onsubmit = () => {
            var descrip = document.querySelector('#compose-body').value;
            fetch('/posts', {
                method: 'POST',
                body: JSON.stringify({
                    description: descrip
                })
            })
            .then(response => response.json())
            .then(result => {
                load_postbox('all posts', result.user_log);
            });
            return false;
       };
    }
    if(postbox === 'search bar'){
        newurl = url.split('/');
        if(elem.style.top == "0px"){
            pos == 0;
            document.querySelector(".search-text").focus();
            document.querySelector('#nav-search svg path').style.fill = rs.getPropertyValue("--blue-color");
            clearInterval(id);
            id = setInterval(bajar, 10);
        }
        else{
            pos = 90;
            if (newurl[2] == "%20" || user_log == "button_nav_search"){
                document.querySelector('#nav-search svg path').style.fill = rs.getPropertyValue("--black-logo");
                clearInterval(id);
                id = setInterval(subir, 10);
                if (user_log == "button_nav_search" && newurl[2] != "%20"){
                    document.getElementById("search").value = " ";
                    const myTimeout = setTimeout(searching, 500);
                }
            }
        }
    }
    if(postbox === 'all posts'){
        window.location.pathname="";
        if(document.querySelector('#profile_view')){
            document.querySelector('#profile_view').style.display = 'none';
        }
        let div_all_posts_view = document.querySelector('#all_posts_view')
        div_all_posts_view.style.display = 'block';
        pages(user_log, 0, 1)
        return false;
    }
    if(postbox === 'edit profile'){
        if(document.querySelector('#edit_profile_view')){
            if(document.querySelector('#alert_modal_message').style.display === "block"){
                document.querySelector('#edit_profile_view').style.display = 'none'
                document.querySelector('#alert_modal_message').style.display = "none";
            }
            if(document.querySelector('#edit_profile_view').style.display === 'block'){
                document.querySelector('#edit_profile_view').style.display = 'none';
                document.querySelector('.modal').style.display = 'none';
                
                document.querySelector('#edit_profile_view h4').innerHTML = 'Changes to be made: ';
                unLockScroll();
            }
            else{
                if(document.getElementById('profile_view_picture').src && (document.getElementById('profile_view_picture').src == document.getElementById('display-image').src)){
                    document.getElementById('display-image').src = document.getElementById('profile_view_picture').src;
                }
                document.querySelector('.modal').style.display = 'block';
                document.querySelector('#new_post_view').style.display = 'none';
                document.querySelector('#edit_profile_view').style.display = 'block';
                document.querySelector('#edit_profile_view #edit_close').style.display = 'block';
                document.querySelector('#edit_profile_options').style.display = "flex";
                document.querySelector('#edit_profile_view h4').innerHTML = 'Edit profile ';    
                lockScroll();
            }
        }
        document.querySelector('#username').focus();
    }
}

function edit_field(id_post){
    const textarea = document.querySelector(`#edit-box-${id_post}`);
    actual_display = textarea.style.display;
    if( actual_display == 'none'){
        new_display = 'block';
        setTimeout(function() {
            const end = textarea.value.length;
            textarea.setSelectionRange(end,end);
            textarea.focus();
        }, 0);
    }else{
        new_display = 'none';
    }
    document.querySelector(`#edit-box-${id_post}`).style.display = new_display;
    document.querySelector(`#edit-save-btn-${id_post}`).style.display = new_display;
    if(id_post_global != id_post && id_post_global > 0 ){
        document.querySelector(`#edit-box-${id_post_global}`).style.display = 'none';
        document.querySelector(`#edit-save-btn-${id_post_global}`).style.display = 'none';
    }
    id_post_global = id_post;
}

function save_edit(id_post){
    var edited_descrip = document.querySelector(`#edit-box-${id_post}`).value;
    fetch(`/edit`, {
        method: 'POST',
        body: JSON.stringify({
            id_post: id_post,
            description: edited_descrip,
        })
    })
    .then(response => response.json())
    .then(result => {
        document.querySelector(`#post-description-${ id_post }`).textContent = result.description;     
        edit_field(id_post)
    })
}
function like(id_post){
    user_like=document.querySelector(`#like-btn-${id_post}`);
    fetch(`/like/${id_post}`, {
        method: 'PUT',
        body: JSON.stringify({
            like_action:user_like.value
        })
    })
    .then(response => response.json())
    .then(result => {
        setTimeout(function(){ 
            document.querySelector(`#heart-img-${id_post}`).innerHTML = '';
            if(result.prev_status=="heart_empty"){
                document.querySelector(`#heart-img-${id_post}`).innerHTML = '<path d="M33.6751 7.9851C32.7561 7.05963 31.6632 6.32493 30.4593 5.82324C29.2555 5.32155 27.9643 5.06277 26.6601 5.06177C24.1931 5.06217 21.8162 5.98889 20 7.65843C18.1841 5.98861 15.8071 5.06185 13.34 5.06177C12.0343 5.06313 10.7417 5.3227 9.53661 5.82555C8.33155 6.3284 7.23783 7.06459 6.31838 7.99177C2.39672 11.9301 2.39838 18.0901 6.32172 22.0118L20 35.6901L33.6784 22.0118C37.6017 18.0901 37.6034 11.9301 33.6751 7.9851Z" fill="#DA2D57"/>';
                document.querySelector(`#like-btn-${id_post}`).value = "heart_full";
                document.querySelector(`#like-count-${id_post}`).firstChild.data = result.likers_array.length;
            }
            else{
                document.querySelector(`#heart-img-${id_post}`).innerHTML = '<path d="M20 7.65843C18.1841 5.98861 15.8071 5.06185 13.34 5.06177C12.0343 5.06313 10.7417 5.3227 9.53661 5.82555C8.33155 6.3284 7.23783 7.06459 6.31838 7.99177C2.39672 11.9301 2.39838 18.0901 6.32172 22.0118L18.5417 34.2318C18.825 34.7301 19.3717 35.0518 20 35.0518C20.258 35.0493 20.5119 34.9863 20.7411 34.8679C20.9704 34.7495 21.1686 34.579 21.32 34.3701L33.6784 22.0118C37.6017 18.0884 37.6017 11.9301 33.675 7.9851C32.7561 7.05963 31.6632 6.32493 30.4593 5.82324C29.2555 5.32155 27.9643 5.06277 26.66 5.06177C24.1931 5.06217 21.8162 5.98889 20 7.65843ZM31.3184 10.3418C33.9234 12.9601 33.925 17.0501 31.3217 19.6551L20 30.9768L8.67838 19.6551C6.07505 17.0501 6.07672 12.9601 8.67505 10.3484C9.94172 9.08843 11.5984 8.3951 13.34 8.3951C15.0817 8.3951 16.7317 9.08843 17.9884 10.3451L18.8217 11.1784C18.9764 11.3333 19.16 11.4562 19.3622 11.5401C19.5644 11.6239 19.7812 11.6671 20 11.6671C20.2189 11.6671 20.4357 11.6239 20.6379 11.5401C20.8401 11.4562 21.0237 11.3333 21.1784 11.1784L22.0117 10.3451C24.5317 7.8301 28.8017 7.83677 31.3184 10.3418Z" fill="#3D3D3D"/>';
                document.querySelector(`#like-btn-${id_post}`).value = "heart_empty";
                document.querySelector(`#like-count-${id_post}`).firstChild.data = result.likers_array.length;
            }
         }, 200);
    })
    .catch((error) => {
        modal_error();
    });
}
function follow(id_poster, user_log, followed_by2){
    user_following=document.querySelector(`#follow-btn`);
    fetch(`/follow/${id_poster}`, {
        method: 'PUT',
        body: JSON.stringify({
            follower: user_log,
            follow_action: user_following.value 
        })
    })
    .then(response => response.json())
    .then(result => {
        if(user_following.value == "Follow"){
            user_following.firstChild.data = "Unfollow";
            user_following.value = "Unfollow";
            sum = parseInt(document.querySelector(`#profile_followers_count`).firstChild.data) + 1;
            document.querySelector(`#profile_followers_count`).firstChild.data = sum;   
        }
        else{
            user_following.firstChild.data = "Follow";
            user_following.value= "Follow";
            rest = parseInt(document.querySelector(`#profile_followers_count`).firstChild.data) - 1;
            document.querySelector(`#profile_followers_count`).firstChild.data = rest;
        }
    });
}

function pages(user_log, next_page, jump_page){
    next_page = parseInt(next_page) + parseInt(jump_page);
    newurl = url.split('/').slice(0,-1).join('/')+'/'+next_page;
    window.location.href = newurl;

}

function myFunction() {
    document.querySelector(".dropdown-content").classList.toggle("hide");
}

var cont=0;
window.onclick = function(event) {
    // When the profile drop down list is open and you click anything else than the options in the dropdown, 
    // then the dropdown closes
    if (!document.querySelector(".hide") && !event.target.matches('#dropbtn-profile') &&  
        !event.target.matches('#open_profile') && !event.target.matches('#log_out') && 
        !event.target.matches('#nav_profile_letter')&& 
        !event.target.matches('#profile_img')){
           myFunction()
    }
}
   
function close_window(){
    unLockScroll();
    document.querySelector('#new_post_view').style.display = 'none';
    document.querySelector('#edit_profile_view').style.display = 'none';
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('#alert_modal_message').style.display = "none";
    document.querySelector('#alert_like_unlogged').style.opacity = 0;
    document.querySelector("#username").value = null;
    document.querySelector("#emailaddress").value = null;
    document.querySelector("#password").value = null;
    document.querySelector("#change_profile_picture").value = null;
    if(document.getElementById('profile_view_picture')){
        if(document.getElementById('profile_view_picture').src)
        document.getElementById('display-image').src = document.getElementById('profile_view_picture').src;
    }
    if (document.getElementById("no_profile_picture_background")){
        document.getElementById("no_profile_picture_background").style.display="block";
        document.getElementById("display-image").style.opacity=0;
    }
}

function lockScroll() {
    document.body.classList.add("lock-scroll");
    document.body.classList.remove("un-lock-scroll");

}

function unLockScroll() {
    document.body.classList.remove("lock-scroll");
    document.body.classList.add("un-lock-scroll");
}

function openOkMessage(ths){
    document.querySelector('#edit_profile_options').style.display = "none";
    document.querySelector('#alert_modal_message').style.display = "block";
    document.querySelector("#alert_modal_message").style.margin = "0";
    let n = 0;
    let message = "";
    document.querySelector('#edit_profile_view h4').innerHTML = 'Changes to be made:';
    if(document.querySelector("#username").value){
        message += "- Username.<br>";
    }
    if(document.querySelector("#emailaddress").value){
        message += "- Email Address<br>";
    }
    if(document.querySelector("#password").value){
        message += "- Password<br>";
    }
    if(document.querySelector("#change_profile_picture").value){
        message += "- Picture";
    }
    if (message){
        document.querySelector("#alert_modal_message #messages").innerHTML = message;
    }
    else{
        document.querySelector("#alert_modal_message #messages").innerHTML = 'No changes';
    }
}

const scrollbarVisible = (element) => {
    return element.scrollHeight > window.innerWidth;
}

function searching() {
    if(event)
        event.preventDefault();
    datos_buscados = document.getElementById("search").value.toLowerCase();
    newurl = url.split('/');
    if (datos_buscados.length != 0 || newurl[2] != "%20"){
        if(datos_buscados.length == 0){
            datos_buscados = " ";
        }
        newurl[2] = datos_buscados;
        newurl = newurl.join('/');
        window.location.href = newurl;
    }
  }

  function bajar() {
    elem.style.opacity= "1";
    if (pos == 90) {
        clearInterval(id);
    } else {
        pos++; 
        elem.style.top = pos + 'px'; 
    }
}

function subir() {
    if (pos == 0) {
        clearInterval(id);
    } else {
        pos--; 
        elem.style.top = pos + 'px'; 
    }
}

function modal_error(){
    document.querySelector('.modal').style.display = 'block';
    document.querySelector('#new_post_view').style.display = 'none';
    document.querySelector('#alert_like_unlogged').style.opacity = 1;
}