package controller

import (
	"app/internal/database"
	"app/internal/model"
	"database/sql"
	"github.com/gin-gonic/gin"
	"net/http"
)

// GetRecognitions получить все распознавания с фильтрацией
// @Summary Получить все распознавания
// @Description Предоставляет список всех распознаваний с возможностью фильтрации.
// @Accept json
// @Produce json
// @Param name query string false "Имя пользователя для фильтрации"
// @Param date query string false "Дата для фильтрации"
// @Param status query string false "Статус для фильтрации"
// @Success 200 {array} model.Recognition "Список распознаваний"
// @Failure 400 {object} model.ErrorResponse "Не удалось получить распознавания"
// @Tags Admin
// @Router /v1/getrecognitions [get]
func GetRecognitions(context *gin.Context) {
	name := context.Query("name")
	date := context.Query("date")
	status := context.Query("status")

	rows, err := database.Db.Query("SELECT id, name, date, result, status, photo FROM atomic_history WHERE ($1 = '' OR name ILIKE '%' || $1 || '%') AND ($2 = '' OR date ILIKE '%' || $2 || '%') AND ($3 = '' OR status ILIKE '%' || $3 || '%')", name, date, status)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "failed to query database"})
		return
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {

		}
	}(rows)

	var recognitions []model.Recognition
	for rows.Next() {
		var rec model.Recognition
		err := rows.Scan(&rec.ID, &rec.Name, &rec.Date, &rec.Result, &rec.Status, &rec.Photo)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": "failed to scan row"})
			return
		}
		recognitions = append(recognitions, rec)
	}

	if len(recognitions) == 0 {
		context.JSON(http.StatusOK, gin.H{"message": "No recognitions"})
	} else {
		context.JSON(http.StatusOK, recognitions)
	}
}
