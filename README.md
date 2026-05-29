Fase-3 Use reducer

## Mi gráfica original

Mi gráfica original muestra el promedio de progreso por categoría. La escogí porque suelo jugar juegos por como me siento entocnes hay algunos meses 
en los que me siento mas comodo jugando un sandbox pero al tener esta grafica me va ayudar a saber si ya jugue muchos sandbo por el mes y puedo 
pasarme al sigueitne genero como rpg.

## Mis 3 decisiones técnicas

1. Estructuré el estado en un reducer para centralizar lista, filtros e historial.
2. La acción más dificil fue REGISTRAR_ACTIVIDAD porque debia alimentar la grafica de los últimos 7 días sin romper la pureza del reducer.
3. La gráfica más compleja fue la de actividad, porque transforma el historial en conteos por día y además respeta los filtros activos.