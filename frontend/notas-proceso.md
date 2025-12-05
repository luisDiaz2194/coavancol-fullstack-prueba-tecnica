1 - Ordenar los datos de asociados el el hook, teniendo en cuenta el tipado de TS.
2 - Al listar los datos el campo identificación no se mostraba y claro, era porque está con tilde en el JSON.
3 - Crear una función HTTP nombrada updateEstadoPipeline y a la vez Actualizar el documento en /asociados/{id}. , me confundió un poco porque estaba haciendo el ENDPOINT como localhost/5000/updateEstadoPipeline y ahi enviaba tanto el id como el nuevo estado, luego vi lo de la url donde querian que solo se enviara un por url y basicamente en el json del POST solo enviar el nuevo estado.
4 - Tenía inconvenientes con los puertos puesto que React estaba en el 3000 y node ebn el 5000 y tenía problemas con eso.
