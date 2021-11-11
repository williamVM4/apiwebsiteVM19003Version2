/*Autor: William Enrique Vásquez Mancía
Carnet: VM19003
Guia 61c*/
var fila="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td><td class='eliminar'></td></tr>";
	 var productos=null;
  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "electronicos":code="c1";break;
	    case "joyeria":code="c2";break;
		case "caballeros":code="c3";break;
		case "damas":code="c4";break;
	}
	return code;
}   
	  var orden=0;
	  
	function listarProductos(productos) {
	  var precio=document.getElementById("price"); 
	  precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
	  var num=productos.length;
	  var listado=document.getElementById("listado");
	  var formulario=document.getElementById("formulario");
	  formulario.style.display="block";
	  var ids,titles,prices,descriptions,categories,fotos, eliminarP;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  titles=document.getElementsByClassName("title");
	  descriptions=document.getElementsByClassName("description");
	  categories=document.getElementsByClassName("category");   
	  fotos=document.getElementsByClassName("foto");   
	  prices=document.getElementsByClassName("price");
	  eliminarP=document.getElementsByClassName("eliminar");
	  if(orden===0) {orden=-1;precio.innerHTML="Precio"}
	  else
	     if(orden==1) {ordenarAsc(productos,"price");precio.innerHTML="Precio A";precio.style.color="darkgreen"}
	     else 
	       if(orden==-1) {ordenarDesc(productos,"price");precio.innerHTML="Precio D";precio.style.color="blue"}
	
		  
	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
        ids[nfila].innerHTML=productos[nfila].id;
		titles[nfila].innerHTML=productos[nfila].title;
		descriptions[nfila].innerHTML=productos[nfila].description;
		categories[nfila].innerHTML=productos[nfila].category;
		catcode=codigoCat(productos[nfila].category);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		prices[nfila].innerHTML="$"+productos[nfila].price;
		fotos[nfila].innerHTML="<img src='"+productos[nfila].image+"'>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].image+"');" );
		eliminarP[nfila].innerHTML = "<button>Eliminar</button>";
		eliminarP[nfila].firstChild.setAttribute("onclick","eliminarProducto('"+productos[nfila].id+"');");
		}
	}

function obtenerProductos() {
	  fetch('https://retoolapi.dev/XnRi7R/productos')
            .then(res=>res.json())
            .then(data=>{
				productos=data;
				productos.forEach(
					function(producto){
						producto.price = parseFloat(producto.price)
					}
				);
				listarProductos(data)})
}

function agregarProducto(){
	var title,price,description,categorie,imagen;
	title=document.getElementById("ftitulo").value;
	description=document.getElementById("fdescripcion").value;
	categorie=document.getElementById("fcategoria").value;   
	imagen=document.getElementById("fimagen").value;   
	price=document.getElementById("fprecio").value;
	if(title != "" && description != "" && categorie != "" && imagen != "" && price != ""){
		var Nproducto ={
			//id:cont+1,
			image: imagen,
			price: price,
			title: title,
			category:categorie,
			description:description
		}
		fetch('https://retoolapi.dev/XnRi7R/productos', {method:"POST",
			body: JSON.stringify(Nproducto),
			headers: {
			'Accept': 'application/json',
			'Content-type': 'application/json; charset=UTF-8',
			}
			 })
			.then(response=>response.json())
			.then(data=> {productos=data, obtenerProductos()});
			document.getElementById("ftitulo").value = "";
			document.getElementById("fdescripcion").value = "";
			document.getElementById("fcategoria").value = "";
			document.getElementById("fimagen").value = "";
			document.getElementById("fprecio").value = "";
			alert("Se ha ingresado el producto");
	}
	else{
		alert("Debe llenar todos los campos presentados.");
	}
}
var ide;
function eliminarProducto(ide){
	fetch("https://retoolapi.dev/XnRi7R/productos/"+ide,
	{ method:"DELETE"})
	.then(response=>response.json())
	.then(data=>{productos=data, obtenerProductos()});
	alert("Se ha eliminado el registro");
}

function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}