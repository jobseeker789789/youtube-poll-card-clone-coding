class user{
    constructor(name , profile_image){
        this.name = name;
        this.profile_image = profile_image;
    }
}
class vote_item_data{
    constructor(txt){
        this.txt = txt;
        this.vote_count = 0;
    }
}class user_action{
    constructor(){
        this.press_like = false;
        this.choice = null;
    }
}
let form_id = 0;
function form_id_maker(){
    form_id++;
    return `id${form_id}`;
}
class vote_form_data{
    constructor(id , user , subject , vote_item_list){
        this.id = id;
        this.uploader = user; //user obj
        this.upload_date = new Date();
        this.subject = subject;
        this.vote_item_list = vote_item_list;
        this.participation_count = 0;
        this.like = 0;
        this.reply = 0;
        this.user_action = new user_action();
    }
    vote_action(n , circle){
        for(let i=0; i<circle; i++){
            this.vote_item_list[n].vote_count++;
            this.participation_count++;
        }
    }
}

function render_upload_date(d){
    let now = new Date();
    let ms = now.getTime() - d.getTime();
    let s = Math.floor(ms/1000);
    let m = Math.floor(s/60);
    let h = Math.floor(m/60);
    let day = Math.floor(h/24);
    let week = Math.floor(day/7);
    let month = Math.floor(day/30);
    let year = Math.floor(day/365);

    if(0 < year){
        return `${year}년 전`
    }else if(0 < month){
        return `${month}달 전`
    }else if(0 < week){
        return `${week}주 전`
    }else if(0 < day){
        return `${day}일 전`
    }else if(0 < h){
        return `${h}시간 전`
    }else if(0 < m){
        return `${m}분 전`
    }else if(0 < s){
        return `${s}초 전`
    }else{
        return `방금 전`
    }
}
function display_amount(n){
    if(n < 1000){
        return n;
    }else if(n < 10000){
        return `${Math.floor(n/100)/10}천`;
    }else if(n < 100000){
        return `${Math.floor(n/1000)/10}만`;
    }else if(n < 100000000){
        return `${Math.floor(n/10000)}만`;
    }else if(n < 1000000000){
        return `${Math.floor(n/10000000)/10}억`; 
    }else{
        return `${Math.floor(n/100000000)}억`;
    }
}

function render_form_elements(form_obj){
    // 재사용 elements
    const white_space_S = document.createElement("div");
    white_space_S.classList.add("white_space_S");

    const white_space_M = document.createElement("div");
    white_space_M.classList.add("white_space_M");

    const white_space_L = document.createElement("div");
    white_space_L.classList.add("white_space_L");

    // 재사용 elements

    const body = document.querySelector("body");

        const vote_form = document.createElement("div");
        vote_form.classList.add("vote_form");
        body.append(vote_form);

            vote_form.append(white_space_L.cloneNode(false));

            const header = document.createElement("header");
            vote_form.append(header);

                const header_left = document.createElement("div");
                header_left.classList.add("left");
                header.append(header_left);

                    const uploader_profile_image = document.createElement("div");
                    uploader_profile_image.classList.add("uploader_profile_image");
                    header_left.append(uploader_profile_image);

                        const img = document.createElement("img");
                        if(form_obj.uploader.profile_image != ""){
                            img.setAttribute("src" , form_obj.uploader.profile_image);
                        }else{
                            img.setAttribute("src" , "./assets/img/default.png");
                        }
                        uploader_profile_image.append(img);

                const header_mid = document.createElement("div");
                header_mid.classList.add("mid");
                header.append(header_mid);

                    const uploader_name = document.createElement("div");
                    uploader_name.classList.add("uploader_name");
                    uploader_name.innerText = form_obj.uploader.name;
                    header_mid.append(uploader_name);

                    const upload_date = document.createElement("div");
                    upload_date.classList.add("upload_date");
                    upload_date.innerText = render_upload_date(form_obj.upload_date);
                    header_mid.append(upload_date);

                const header_right = document.createElement("div");
                header_right.classList.add("right");
                header.append(header_right);

                    const more_icon_box = document.createElement("div");
                    more_icon_box.classList.add("icon");
                    header_right.append(more_icon_box);

                        const more_icon = document.createElement("i");
                        more_icon.classList.add("uil");
                        more_icon.classList.add("uil-ellipsis-v");
                        more_icon_box.append(more_icon);
                        
                    const drop_down_menu = document.createElement("ul");
                    drop_down_menu.classList.add("drop_down_menu");
                    header_right.append(drop_down_menu);

                        const drop_down_item = document.createElement("li");
                        drop_down_item.innerText = "신고";
                        drop_down_menu.append(drop_down_item);

                    const dark_curtain = document.createElement("div");
                    dark_curtain.classList.add("dark_curtain");
                    header_right.append(dark_curtain);

                    more_icon_box.onclick = function(){
                        drop_down_menu.classList.add("active");
                        dark_curtain.classList.add("active");
                    }

                    dark_curtain.onclick = function(){
                        drop_down_menu.classList.remove("active");
                        this.classList.remove("active");

                    }

            vote_form.append(white_space_L.cloneNode(false));

            const section = document.createElement("section");
            vote_form.append(section);

                const subject = document.createElement("div");
                subject.classList.add("subject");
                subject.innerText = form_obj.subject;
                section.append(subject);

                section.append(white_space_M.cloneNode(false));

                const form = document.createElement("form");
                section.append(form);


                    for(let i of form_obj.vote_item_list){

                        const label = document.createElement("label");
                        form.append(label);
                        form.append(white_space_S.cloneNode(false));

                            const input_radio = document.createElement("input");
                            input_radio.setAttribute("type" , "radio");
                            input_radio.setAttribute("name" , form_obj.id);
                            input_radio.setAttribute("value" , i.txt);
                            label.append(input_radio);

                            const text = document.createElement("div");
                            text.classList.add("text");
                            text.innerText = i.txt;
                            label.append(text);

                            const gragh = document.createElement("div");
                            gragh.classList.add("gragh");
                            label.append(gragh);

                            const vote_count = document.createElement("div");
                            vote_count.classList.add("vote_count");
                            label.append(vote_count);

                            input_radio.onclick = function(){
                                if(form_obj.user_action.choice == null){
                                    // 투표 안 함 => 투표 함
                                    i.vote_count++;
                                    form_obj.user_action.choice = i;
                                    form_obj.participation_count++;
                                }else{
                                    if(form_obj.user_action.choice === i){
                                        // 선택한 item 다시 누른 경우
                                        form_obj.user_action.choice.vote_count--;
                                        form_obj.user_action.choice = null;
                                        form_obj.participation_count--;
                                        input_radio.checked = false;
                                    }else{
                                        // 다른 item으로 변경하는 경우
                                        i.vote_count++;
                                        form_obj.user_action.choice.vote_count--;
                                        form_obj.user_action.choice = i;
                                    }
                                }
                                if(form_obj.user_action.choice != null){
                                    form.classList.add("active");
                                }else{
                                    form.classList.remove("active");
                                }
                                const labels = form.getElementsByTagName("label");
                                for(let j=0; j<form_obj.vote_item_list.length; j++){
                                    if(form_obj.user_action.choice == form_obj.vote_item_list[j]){
                                        labels[j].classList.add("chose");
                                    }else{
                                        labels[j].classList.remove("chose");
                                    }

                                    const percentage = ((form_obj.vote_item_list[j].vote_count / form_obj.participation_count) * 100).toFixed(0);

                                    const temp_vote_count = labels[j].querySelector(".vote_count");
                                    temp_vote_count.innerText = `${percentage}%`;

                                    const temp_gragh = labels[j].querySelector(".gragh");
                                    temp_gragh.setAttribute("style" , `width : ${percentage}%`);
                                }

                                const temp_participation_count = section.querySelector(".participation_count");
                                temp_participation_count.innerText = `${display_amount(form_obj.participation_count)}명 투표`;
                            }
                    }
                    const participation_count = document.createElement("div");
                    participation_count.classList.add("participation_count");
                    participation_count.innerText = `${display_amount(form_obj.participation_count)}명 투표`;
                    section.append(participation_count);

            vote_form.append(white_space_L.cloneNode(false));

            const footer = document.createElement("footer");
            vote_form.append(footer);

                    const footer_left = document.createElement("div");
                    footer_left.classList.add("left");
                    footer.append(footer_left);

                        const click_censor_up = document.createElement("div");
                        click_censor_up.classList.add("click_censor");
                        click_censor_up.classList.add("up");
                        footer_left.append(click_censor_up);

                            const like_icon_box_up = document.createElement("div");
                            like_icon_box_up.classList.add("icon");
                            like_icon_box_up.classList.add("like");
                            like_icon_box_up.classList.add("up");
                            click_censor_up.append(like_icon_box_up);

                                const like_icon_up_unactive = document.createElement("i");
                                like_icon_up_unactive.classList.add("unactive");
                                like_icon_up_unactive.classList.add("bi");
                                like_icon_up_unactive.classList.add("bi-hand-thumbs-up");
                                like_icon_box_up.append(like_icon_up_unactive);

                                const like_icon_up_active = document.createElement("i");
                                like_icon_up_active.classList.add("active");
                                like_icon_up_active.classList.add("bi");
                                like_icon_up_active.classList.add("bi-hand-thumbs-up-fill");
                                like_icon_box_up.append(like_icon_up_active);

                            const like_count_up = document.createElement("div");
                            like_count_up.classList.add("like_count");
                            like_count_up.classList.add("up");
                            like_count_up.innerText = display_amount(form_obj.like);
                            click_censor_up.append(like_count_up);

                            click_censor_up.onclick = function(){
                                if(!form_obj.user_action.press_like){
                                    form_obj.user_action.press_like = true;
                                    click_censor_up.classList.add("active");

                                    form_obj.like++;
                                    like_count_up.innerText = display_amount(form_obj.like);
                                }else{
                                    form_obj.user_action.press_like = false;
                                    click_censor_up.classList.remove("active");

                                    form_obj.like--;
                                    like_count_up.innerText = display_amount(form_obj.like);
                                }
                            }

                        const click_censor_down = document.createElement("div");
                        click_censor_down.classList.add("click_censor");
                        click_censor_down.classList.add("down");
                        footer_left.append(click_censor_down);

                            const like_icon_box_down = document.createElement("div");
                            like_icon_box_down.classList.add("icon");
                            like_icon_box_down.classList.add("like");
                            like_icon_box_down.classList.add("down");
                            click_censor_down.append(like_icon_box_down);

                                const like_icon_down = document.createElement("i");
                                like_icon_down.classList.add("bi");
                                like_icon_down.classList.add("bi-hand-thumbs-down");
                                like_icon_box_down.append(like_icon_down);

                            const like_count_down = document.createElement("div");
                            like_count_down.classList.add("like_count");
                            like_count_down.classList.add("down");
                            click_censor_down.append(like_count_down);

                    const footer_right = document.createElement("div");
                    footer_right.classList.add("right");
                    footer.append(footer_right);

                        const reply_icon_box = document.createElement("div");
                        reply_icon_box.classList.add("icon");
                        footer_right.append(reply_icon_box);

                            const reply_icon = document.createElement("i");
                            reply_icon.classList.add("bi");
                            reply_icon.classList.add("bi-chat-right-text");
                            reply_icon_box.append(reply_icon);

                        const reply_count = document.createElement("div");
                        reply_count.classList.add("reply_count");
                        reply_count.innerText = form_obj.reply;
                        footer_right.append(reply_count);

            vote_form.append(white_space_M.cloneNode(false));
}

let temp_user; 
let temp_subject;
let temp_vote_item_list;
let temp_vote_form_data;
let temp_vote_form_list = [];
// 
temp_user= new user("사용자 이름" , "");
temp_subject = "무엇을 할까";
temp_vote_item_list = [];
temp_vote_item_list.push(
    new vote_item_data("산책하기") ,
    new vote_item_data("공부하기") ,
    new vote_item_data("청소하기")
);
temp_vote_form_data = new vote_form_data(
    form_id_maker() ,
    temp_user ,
    temp_subject ,
    temp_vote_item_list
);

temp_vote_form_data.vote_action(0 , 3);
temp_vote_form_data.vote_action(1 , 3);
temp_vote_form_data.vote_action(2 , 3);

temp_vote_form_data.like = 1
temp_vote_form_data.reply = 3;
temp_date = new Date(2021 , 04-1 , 12 , 20 , 00 , 30);
temp_vote_form_data.upload_date = temp_date;
temp_vote_form_list.push(temp_vote_form_data);
// 

for(let i of temp_vote_form_list){
    render_form_elements(i);
}

