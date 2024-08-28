import{d as x,a as h,r as d,o as y,w as b,b as k,c as r,e as f,f as e,g as L,h as m,i as V,F as p,j as P,u as _,k as S,t as l}from"./index-WI-smavh.js";import{f as B}from"./utils-CuQyoUPz.js";import{_ as C,a as N}from"./Alerts-DM2eUFvW.js";const $=x("posts",{state:()=>({posts:[],post:{},isLoading:!1,error:null}),actions:{async fetchPosts(){this.isLoading=!0;try{const a=await h.get("https://mpiadev.pythonanywhere.com/api/posts");this.posts=a.data}catch(a){this.error=a}finally{this.isLoading=!1}},async fetchPost(a){this.isLoading=!0;try{const s=await h.get(`http://127.0.0.1:5000/api/posts/${a}`);s.status===201&&(this.post=s.data,this.updatePostViews(a,s.data.views))}catch(s){this.error=s}finally{this.isLoading=!1}},updatePostViews(a,s){const n=this.posts.find(i=>i.slug===a);n&&(n.views=s)}}}),j={class:"w-full my-12"},q={class:"max-w-4xl px-6 mx-auto"},A={class:"w-full flex flex-col gap-10"},D=["src","alt"],F={class:"w-full p-6"},R={class:"text-2xl font-bold"},T={class:"mt-3"},z={class:"w-full flex items-center gap-6 uppercase text-sm mt-6"},E={class:"hidden sm:block"},I={class:"hidden sm:block"},H={__name:"IndexView",setup(a){const s=$(),n=d(""),i=d(""),c=d(!1),g=()=>{c.value=!1};y(async()=>{await s.fetchPosts(),s.posts.length===0&&(n.value="info",i.value="Aucun article n'est disponible",c.value=!0)}),b(()=>s.post,o=>{o.slug&&s.updatePostViews(o.slug,o.views)});const w=(o,u)=>o.length<=u?o:o.slice(0,u)+"...";return(o,u)=>{const v=k("RouterLink");return r(),f(p,null,[e("section",null,[L(N,{title:"Tous les articles","sub-title":"Ne manquez aucune actualité",note:"Je partage via ce blog des astuces et découvertes dans le domaine de l'informatique"})]),e("section",j,[e("div",q,[c.value?(r(),m(C,{key:0,category:n.value,text:i.value,action:g},null,8,["category","text"])):V("",!0),e("div",A,[(r(!0),f(p,null,P(_(s).posts,t=>(r(),m(v,{key:t.slug,to:{name:"detail",params:{slug:t.slug}},class:"w-full block shadow-md rounded-2xl border border-solid border-gray-300 hover:border-blue-600"},{default:S(()=>[e("img",{src:t.image_url,alt:t.slug,class:"w-full h-44 object-cover rounded-2xl shadow-md"},null,8,D),e("div",F,[e("h3",R,l(t.title),1),e("p",T,l(w(t.resume,200)),1),e("div",z,[e("span",null,l(_(B)(t.created_at)),1),e("span",null,l(t.author),1),e("span",E,l(t.views)+" vues",1),e("span",I,l(t.comments.length)+" Commentaires",1)])])]),_:2},1032,["to"]))),128))])])])],64)}}};export{H as default};
