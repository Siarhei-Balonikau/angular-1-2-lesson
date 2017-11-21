# angular-1-2-lesson

Созданная структура лежит в /app/
- папка /shared/ содержит переиспользуемые компоненты (button, field, course, etc.)
- папка /components/ включает в структурные компоненты, которые не переиспользуются (pages, header, footer, etc.) 


Если у компонента есть зависимость от других, то внутри это указывал через комментарий. 
Например в /shared/search есть:

// import /shared/button/

// import /shared/input-text/


Интерфейс для 11 задачи находится в 

/app/shared/course
