package controller

import (
	"app/internal/database"
	"app/internal/model"
	"database/sql"
	"github.com/gin-gonic/gin"
	"net/http"
)

// GetHistory получить историю пользователя.
// @Summary Получить историю пользователя
// @Description Предоставляет историю распознаваний юзера.
// @Accept json
// @Produce json
// @Success 200 {object} model.CodeResponse "История получена"
// @Failure 400 {object} model.ErrorResponse "Не удалось получить историю"
// @Tags History
// @Security CookieAuth
// @Router /v1/gethistory [get]
func GetHistory(context *gin.Context) {
	name := context.MustGet("Name").(string)
	rows, err := database.Db.Query("SELECT date, result, status, photo FROM atomic_history WHERE name = $1", name)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "failed to query database"})
		return
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {

		}
	}(rows)

	var history []gin.H
	for rows.Next() {
		var date, result, status, photo string
		err := rows.Scan(&date, &result, &status, &photo)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": "failed to scan row"})
			return
		}

		history = append(history, gin.H{
			"date":   date,
			"result": result,
			"status": status,
			"photo":  photo,
		})
	}

	if len(history) == 0 {
		context.JSON(http.StatusOK, []interface{}{})
	} else {
		context.JSON(http.StatusOK, history)
	}
}

// AddHistory добавить историю пользователя.
// @Summary Добавить историю пользователя
// @Description Добавляет запись в историю распознаваний юзера.
// @Accept json
// @Produce json
// @Success 200 {object} model.CodeResponse "Запись добавлена"
// @Failure 400 {object} model.ErrorResponse "Не удалось добавить запись"
// @Tags History
// @Security CookieAuth
// @Router /v1/addhistory [post]
func AddHistory(context *gin.Context) {
	name, _ := context.MustGet("Name").(string)
	var request model.NewHistory
	if err := context.BindJSON(&request); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "invalid JSON data"})
		return
	}

	_, err := database.Db.Exec("INSERT INTO atomic_history (name, date, result, status, photo) VALUES ($1, $2, $3, $4, $5)", name, request.Date, request.Result, request.Status, request.Photo)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "failed to insert history into database"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "History added successfully"})
}
