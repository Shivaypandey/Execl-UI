const newBtn=document.querySelector(".btn-new");
const inputSection=document.querySelector(".input-section");
const showTableBtn=document.querySelector(".btn-tbl");
const clearTbl=document.querySelector(".clear-tbl");
let data = [];

    

let inputFun=()=>{
    let newInputGroup=document.createElement("div");
    newInputGroup.classList.add("row");
    newInputGroup.classList.add("justify-content-around");


    let customerName=document.createElement("input");
    customerName.classList.add("col-12");
    customerName.classList.add("col-md-4");
    customerName.classList.add("customerName");
    customerName.type="text";
    customerName.placeholder=" Customer Name ";
    customerName.required="required";

let mobileNo=document.createElement("input");
mobileNo.classList.add("col-12");
mobileNo.classList.add("col-md-3");
mobileNo.classList.add("mobileNo");
mobileNo.type="number";
mobileNo.placeholder=" Mobile No ";
mobileNo.required="required";

let inputDate=document.createElement("input");
inputDate.classList.add("col-12");
inputDate.classList.add("col-md-3");
inputDate.classList.add("inputDate");
inputDate.type="date";
inputDate.required="required";
var date = new Date();
var year = date.getFullYear();
var month = ("0" + (date.getMonth() + 1)).slice(-2); 
var day = ("0" + date.getDate()).slice(-2);
var formattedDate = year + '-' + month + '-' + day;
inputDate.value = formattedDate;

let visitReview=document.createElement("input");
visitReview.classList.add("col-12");
visitReview.classList.add("col-md-4");
visitReview.classList.add("visitReview");
visitReview.placeholder=" Visit Review ";
visitReview.required="required";


let delBtn=document.createElement("button");
delBtn.classList.add("btn-del");
delBtn.classList.add("custom-btn");
delBtn.textContent = 'Delete';
delBtn.classList.add("col-3");
delBtn.classList.add("col-md-2");
delBtn.innerHTML=`<i class="fa-solid fa-trash fa-beat fa-lg"></i>`;

let saveBtn=document.createElement("button");
saveBtn.classList.add("save-btn");
saveBtn.classList.add("custom-btn");
saveBtn.classList.add("col-4");
saveBtn.classList.add("col-md-2");
saveBtn.textContent = 'Save';


let resetBtn=document.createElement("button");
resetBtn.classList.add("reset-btn");
resetBtn.classList.add("custom-btn");
resetBtn.classList.add("col-4");
resetBtn.classList.add("col-md-2");
resetBtn.textContent = 'Reset';


delBtn.addEventListener('click',()=>{
    customerName.remove();
    mobileNo.remove();
    visitReview.remove();
    delBtn.remove();
    inputDate.remove();
    saveBtn.remove();
    resetBtn.remove();
});
resetBtn.addEventListener('click',()=>{
    customerName.value="";
    mobileNo.value="";
    visitReview.value="";

})

saveBtn.addEventListener('click',()=>{
    $('.customerName').each(function(index) {
        let Name = $(this).val();
        let mobile = $('.mobileNo').eq(index).val();
         let  date_time=$('.inputDate').eq(index).val();

         let dateArr=date_time.split('-');
         console.log(dateArr);
           let excel_date=`${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
         let  review=$('.visitReview').eq(index).val();
        
          
            if (Name && mobile && date_time) {
                
            data.push([Name, mobile,excel_date,review]);
        } 
        else{
            alert("Please fill all the fields");
        }    
    });
    customerName.value="";
    mobileNo.value="";
    visitReview.value="";
})

newInputGroup.appendChild(customerName);
newInputGroup.appendChild(mobileNo);
newInputGroup.appendChild(inputDate);
newInputGroup.appendChild(visitReview);
newInputGroup.appendChild(saveBtn);
newInputGroup.appendChild(resetBtn);
newInputGroup.appendChild(delBtn);


if (inputSection.firstChild) {
    inputSection.insertBefore(newInputGroup, inputSection.firstChild);
} else {
    inputSection.appendChild(newInputGroup);
}
   
}



let tblFun=()=>{
    const showtbl=document.querySelector('.hidden');
    if( showtbl.className=='hidden'){
    showtbl.style.display='block';
    }
     $('#item-table').DataTable({
        
        data: data,
        destroy: true,
        scrollX: true,
        columns: [
            { title: "Customer Name" },
            { title: "Mobile NO" },
            { title: "Date" },
            {title:"Visit Review"}
        ],
            layout: {
                topStart: {
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            customize: function (xlsx) {
                                var sheet = xlsx.xl.worksheets['sheet1.xml'];
         
                                sheet.querySelectorAll('row c[r^="C"]').forEach((el) => {
                                    el.setAttribute('s', '2');
                                });
                            }
                        }
                    ]
                }
            
},
    });
};
newBtn.addEventListener('click',inputFun);

showTableBtn.addEventListener('click',()=>{
    function scrollToDiv() {
        document.getElementById("tbl-container").scrollIntoView({
            behavior: 'smooth'
        });
    }
    tblFun();
    scrollToDiv();
});

inputFun();
tblFun();
clearTbl.addEventListener('click',()=>{
    data=[];
    tblFun();
})