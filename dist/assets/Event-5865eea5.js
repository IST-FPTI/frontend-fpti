import{r as g,e as w,b as c,f as u,g as e,i as m,n as U,l as f,c as D,G as b,J as B,j as i,v as d,F as k,K as C,H as S,I as v}from"./index-76559668.js";import{S as T,N as A,F as N}from"./Footer-c5e1c190.js";import{P as E,D as V}from"./TimeVote-a4bdbbf6.js";import{a as p}from"./_commonjsHelpers-34c3cec1.js";import{S as I}from"./sweetalert2.all-777e80f8.js";const F={id:"wrapper"},R={id:"content-wrapper",class:"d-flex flex-column"},q={id:"content"},z={class:"container-fluid mt-4"},K=e("h1",{class:"h3 mb-0 text-gray-800 text-center mb-5"},"Data Event",-1),L={class:"row"},P=e("div",{class:"col-1"},null,-1),x={class:"col-10"},j=C('<div class="row mb-3"><div class="col-6"><button class="btn btn-warning me-2" data-toggle="modal" data-target="#addEvent"><i class="bi bi-plus-circle-fill"></i> Buat Event </button></div><div class="col-6"></div></div>',1),J={class:"table-responsive"},M={key:0,class:"text-center"},O=e("thead",null,[e("tr",null,[e("th",{scope:"col",style:{width:"50px"}},"No"),e("th",{scope:"col"},"Aksi"),e("th",{scope:"col"},"Nama Event"),e("th",{scope:"col"},"Tanggal Dimulai"),e("th",{scope:"col"},"Deskripsi")])],-1),H={class:"row"},G={class:"col-4"},W=e("i",{class:"bi bi-file-earmark-pdf-fill"},null,-1),Q={class:"col-4"},X=["onClick"],Y=e("i",{class:"bi bi-pencil-square"},null,-1),Z=[Y],ee={class:"col-4"},te=["onClick"],ae=e("i",{class:"bi bi-trash3"},null,-1),se=[ae],ne=e("div",{class:"col-1"},null,-1),oe={class:"modal fade",id:"addEvent",tabindex:"-1",role:"dialog","aria-labelledby":"addEventLabel","aria-hidden":"true"},le={class:"modal-dialog",role:"document"},ie={class:"modal-content"},de=e("div",{class:"modal-header"},[e("h5",{class:"modal-title",id:"addEventLabel"},"Buat Event Baru"),e("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close"},[e("span",{"aria-hidden":"true"},"×")])],-1),re={class:"modal-body"},ce={class:"mb-3"},ue=e("label",{for:"ketua",class:"form-label"},"Nama Event",-1),me={class:"mb-3"},ve=e("label",{for:"ketua",class:"form-label"},"Tanggal Event",-1),pe={class:"mb-3"},he=e("label",{for:"keterangan",class:"form-label"},"Keterangan",-1),_e={class:"modal-footer"},ge=e("button",{type:"button",class:"btn btn-secondary","data-dismiss":"modal"}," Batal ",-1),fe={class:"modal fade",id:"editTransaksi",tabindex:"-1",role:"dialog","aria-labelledby":"editTransaksiLabel","aria-hidden":"true"},be={class:"modal-dialog",role:"document"},ke={class:"modal-content"},Ee=e("div",{class:"modal-header"},[e("h5",{class:"modal-title",id:"editTransaksiLabel"},"Edit Pengeluaran"),e("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close"},[e("span",{"aria-hidden":"true"},"×")])],-1),ye={class:"modal-body"},we={class:"mb-3"},Ue=e("label",{for:"ketua",class:"form-label"},"Nama Event",-1),De={class:"mb-3"},Be=e("label",{for:"ketua",class:"form-label"},"Tanggal Event",-1),Ce={class:"mb-3"},Se=e("label",{for:"keterangan",class:"form-label"},"Keterangan",-1),Te={class:"modal-footer"},Ae=e("button",{type:"button",class:"btn btn-secondary","data-dismiss":"modal"}," Batal ",-1);E.use(V);const Ne={data(){return{events:[],formEvent:{nama_event:"",tanggal_event:"",deskripsi_event:""},formUpdateEvent:{nama_event:"",tanggal_event:"",deskripsi_event:"",id_event:""},ready:!1,user_id:""}},methods:{setDataUpdate(t,s,l,r){this.formUpdateEvent.nama_event=t,this.formUpdateEvent.tanggal_event=s,this.formUpdateEvent.deskripsi_event=l,this.formUpdateEvent.id_event=r},createEvent(){this.ready=!1;const t=new FormData;t.append("nama_event",this.formEvent.nama_event),t.append("tanggal_event",this.formEvent.tanggal_event),t.append("deskripsi_event",this.formEvent.deskripsi_event),t.append("id_user",this.user_id),p.post("https://backend.keuanganfpti.com/api/create-event",t,{headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer "+sessionStorage.getItem("token")}}).then(s=>{console.log(s.data),this.formEvent={jumlah_transaksi:"",deskripsi:"",tgl_transaksi:"",selectedPenerima:""},this.showAlert("Request Success","Event berhasil buat","success"),this.fetchDataEvents()}).catch(s=>{this.showAlert("Request Failed","Event gagal buat","error"),console.error(s),this.ready=!0})},updateEvent(){this.ready=!1;const t=new FormData;t.append("nama_event",this.formUpdateEvent.nama_event),t.append("tanggal_event",this.formUpdateEvent.tanggal_event),t.append("deskripsi_event",this.formUpdateEvent.deskripsi_event),t.append("id_user",this.user_id),p.post(`https://backend.keuanganfpti.com/api/update-event/${this.formUpdateEvent.id_event}`,t,{headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer "+sessionStorage.getItem("token")}}).then(s=>{console.log(s.data),this.showAlert("Request Success","Event berhasil diupdate","success"),this.fetchDataEvents()}).catch(s=>{this.showAlert("Request Failed","Event gagal diupdate","error"),console.error(s),this.ready=!0})},deleteEvent(t){this.ready=!1,p.delete(`https://backend.keuanganfpti.com/api/delete-event/${t}`,{headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer "+sessionStorage.getItem("token")}}).then(s=>{console.log(s.data),this.showAlert("Request Success","Event berhasil dihapus","success"),this.fetchDataEvents()}).catch(s=>{this.showAlert("Request Failed","Event gagal dihapus","error"),console.error(s),this.ready=!0})},async fetchDataEvents(){try{const t=await p.get("https://backend.keuanganfpti.com/api/list-event",{headers:{Authorization:"Bearer "+sessionStorage.getItem("token")}});this.events=t.data.data,this.ready=!0}catch(t){this.ready=!0,console.error(t)}},showAlert(t,s,l){this.$swal({title:t,text:s,icon:l}).then(()=>{$("#addEvent").modal("hide"),$("#editTransaksi").modal("hide")})},konfirmasi(t,s){I.fire({title:"Konfirmasi Penghapusan",text:`Apakah Anda yakin ingin menghapus event ${s}?`,icon:"warning",showCancelButton:!0,confirmButtonColor:"#d33",cancelButtonColor:"#061387",confirmButtonText:"Hapus",cancelButtonText:"Batal"}).then(l=>{l.isConfirmed&&this.deleteEvent(t)})}},computed:{formatCurrency:function(){return function(t){return t?new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR"}).format(t):"Rp 0,00"}}},created(){const t=sessionStorage.getItem("token");if(t)try{const[s,l]=t.split("."),r=JSON.parse(atob(s)),n=atob(l),o=JSON.parse(atob(t.split(".")[1])),h=o.exp,a=new Date(h*1e3);console.log("Waktu Kedaluwarsa (UTC):",a.toUTCString()),new Date>a?(console.log("Keluar"),sessionStorage.removeItem("token"),this.$router.push("/")):console.log("Aman");const _=o.level;this.user_id=o.id,console.log("ini idddd:",this.user_id),_!=="1"?this.$router.push("/unauthorized"):(!r||!n)&&this.$router.push("/"),this.fetchDataEvents()}catch(s){console.error("Error decoding token:",s),this.$router.push("/")}else this.$router.push("/")}},qe=Object.assign(Ne,{__name:"Event",setup(t){const s=g(!1),l=g(""),r=()=>{s.value=!s.value,l.value=s.value?"toggle-sidebar":""};return(n,o)=>{const h=w("router-link");return c(),u(k,null,[e("div",F,[m(T,{class:U(l.value)},null,8,["class"]),e("div",R,[e("div",q,[m(A,{onToggleSidebar:r}),e("div",z,[K,e("div",L,[P,e("div",x,[j,e("div",J,[n.ready?f("",!0):(c(),u("p",M,"Loading...")),n.ready?(c(),D(B(E),{key:1,class:"display table table-striped"},{default:b(()=>[O,e("tbody",null,[(c(!0),u(k,null,S(n.events,(a,_)=>(c(),u("tr",{key:a.id},[e("td",null,v(_+1),1),e("td",null,[e("div",H,[e("div",G,[m(h,{class:"btn btn-success",to:{name:"admin-report",params:{eventId:a.id}}},{default:b(()=>[W]),_:2},1032,["to"])]),e("div",Q,[e("button",{type:"button",class:"btn btn-warning","data-toggle":"modal","data-target":"#editTransaksi",onClick:y=>n.setDataUpdate(a.nama_event,a.tanggal_event,a.deskripsi_event,a.id)},Z,8,X)]),e("div",ee,[e("button",{onClick:y=>n.konfirmasi(a.id,a.nama_event),class:"btn btn-danger customDetail"},se,8,te)])])]),e("td",null,v(a.nama_event),1),e("td",null,v(a.tanggal_event),1),e("td",null,v(a.deskripsi_event),1)]))),128))])]),_:1})):f("",!0)])]),ne])])]),m(N)])]),e("div",oe,[e("div",le,[e("div",ie,[de,e("div",re,[e("form",null,[e("div",ce,[ue,i(e("input",{type:"text",class:"form-control",id:"mapel",placeholder:"masukkan nominal pengeluaran","onUpdate:modelValue":o[0]||(o[0]=a=>n.formEvent.nama_event=a)},null,512),[[d,n.formEvent.nama_event]])]),e("div",me,[ve,i(e("input",{type:"date",class:"form-control",id:"mapel","onUpdate:modelValue":o[1]||(o[1]=a=>n.formEvent.tanggal_event=a)},null,512),[[d,n.formEvent.tanggal_event]])]),e("div",pe,[he,i(e("textarea",{class:"form-control",id:"keterangan",placeholder:"Masukkan keterangan","onUpdate:modelValue":o[2]||(o[2]=a=>n.formEvent.deskripsi_event=a)},null,512),[[d,n.formEvent.deskripsi_event]])])])]),e("div",_e,[ge,e("button",{type:"button",class:"btn blueButton",onClick:o[3]||(o[3]=(...a)=>n.createEvent&&n.createEvent(...a))}," Simpan ")])])])]),e("div",fe,[e("div",be,[e("div",ke,[Ee,e("div",ye,[e("form",null,[e("div",we,[Ue,i(e("input",{type:"text",class:"form-control",id:"mapel",placeholder:"masukkan nominal pengeluaran","onUpdate:modelValue":o[4]||(o[4]=a=>n.formUpdateEvent.nama_event=a)},null,512),[[d,n.formUpdateEvent.nama_event]])]),e("div",De,[Be,i(e("input",{type:"date",class:"form-control",id:"mapel","onUpdate:modelValue":o[5]||(o[5]=a=>n.formUpdateEvent.tanggal_event=a)},null,512),[[d,n.formUpdateEvent.tanggal_event]])]),e("div",Ce,[Se,i(e("textarea",{class:"form-control",id:"keterangan",placeholder:"Masukkan keterangan","onUpdate:modelValue":o[6]||(o[6]=a=>n.formUpdateEvent.deskripsi_event=a)},null,512),[[d,n.formUpdateEvent.deskripsi_event]])])])]),e("div",Te,[Ae,e("button",{type:"button",class:"btn blueButton",onClick:o[7]||(o[7]=(...a)=>n.updateEvent&&n.updateEvent(...a))}," Simpan ")])])])])],64)}}});export{qe as default};
