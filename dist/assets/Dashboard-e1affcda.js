import{S as m}from"./Sidebar-0d63748e.js";import{N as g,F as v}from"./Footer-8f41188f.js";import{C as r,S as f}from"./Card-16d60966.js";import{a as p}from"./sweetalert2.all-1e3fb24f.js";import{r as c,b as _,f as b,i as o,n as y,g as t,y as S}from"./index-c01b12d4.js";const D={id:"wrapper"},w={id:"content-wrapper",class:"d-flex flex-column"},k={id:"content"},x={class:"container-fluid mt-4"},C=t("h1",{class:"h3 mb-0 text-gray-800 text-center"},"Dashboard",-1),P={class:"row mt-3"},B={class:"col-sm-6"},I={class:"col-sm-3"},N={class:"col-sm-3"},T={class:"row mt-4"},V={class:"col-xl-3 col-md-6 mb-4"},$={class:"col-xl-3 col-md-6 mb-4"},R={class:"col-xl-3 col-md-6 mb-4"},z=S('<div class="col-xl-3 col-md-6 mb-4"><div class="card border-left-warning shadow h-100 py-2"><div class="card-body"><div class="row no-gutters align-items-center"><div class="col mr-2"><div class="text-xs font-weight-bold text-warning text-uppercase mb-1"> Akun </div><div class="h5 mb-0 font-weight-bold text-gray-800"> 4 </div></div><div class="col-auto"><i class="fas fa-solid fa-users fa-2x text-gray-300"></i></div></div></div></div></div>',1),A={data(){return{hutangBelumDibayar:0,hutangSudahDibayar:0,saldoSaatIni:1e5,totalPenerimaan:0,totalPengiriman:0,ready:!1}},methods:{async fetchDataReport(){try{const a=await p.get("https://backend.keuanganfpti.com/api/report-keuangan/1",{headers:{Authorization:"Bearer "+sessionStorage.getItem("token")}});this.hutangBelumDibayar=a.data.hutangBelumDibayar,this.hutangSudahDibayar=a.data.hutangSudahDibayar,this.saldoSaatIni=a.data.saldoSaatIni,this.totalPenerimaan=a.data.totalPenerimaan,this.totalPengiriman=a.data.totalPengiriman,this.ready=!0}catch(a){console.error(a)}}},computed:{formatCurrency:function(){return function(a){return a?new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR"}).format(a):"Rp 0,00"}}},created(){const a=sessionStorage.getItem("token");if(a)try{const[s,n]=a.split("."),l=JSON.parse(atob(s)),e=atob(n),i=JSON.parse(atob(a.split(".")[1])),u=i.exp,d=new Date(u*1e3);console.log("Waktu Kedaluwarsa (UTC):",d.toUTCString()),new Date>d?(console.log("Keluar"),sessionStorage.removeItem("token"),this.$router.push("/")):console.log("Aman");const h=i.level;this.user_id=i.id,console.log("ini idddd:",this.user_id),h!=="1"?this.$router.push("/unauthorized"):(!l||!e)&&this.$router.push("/"),this.fetchDataReport()}catch(s){console.error("Error decoding token:",s),this.$router.push("/")}else this.$router.push("/")}},U=Object.assign(A,{__name:"Dashboard",setup(a){const s=c(!1),n=c(""),l=()=>{s.value=!s.value,n.value=s.value?"toggle-sidebar":""};return(e,i)=>(_(),b("div",D,[o(m,{class:y(n.value)},null,8,["class"]),t("div",w,[t("div",k,[o(g,{onToggleSidebar:l}),t("div",x,[C,t("div",P,[t("div",B,[o(f)]),t("div",I,[o(r,{color:"success",header:"Pemasukan",value:e.formatCurrency(e.totalPenerimaan),icon:"fa-calendar"},null,8,["value"])]),t("div",N,[o(r,{color:"danger",header:"Pengeluaran",value:e.formatCurrency(e.totalPengiriman),icon:"fa-calendar"},null,8,["value"])])]),t("div",T,[t("div",V,[o(r,{color:"warning",header:"Saldo",value:e.formatCurrency(e.saldoSaatIni),icon:"fa-calendar"},null,8,["value"])]),t("div",$,[o(r,{color:"primary",header:"Lunas",value:e.formatCurrency(e.hutangSudahDibayar),icon:"fa-clipboard-list"},null,8,["value"])]),t("div",R,[o(r,{color:"info",header:"Hutang",value:e.formatCurrency(e.hutangBelumDibayar),icon:"fa-clipboard-list"},null,8,["value"])]),z])])]),o(v)])]))}});export{U as default};
