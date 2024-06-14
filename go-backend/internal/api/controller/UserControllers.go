package controller

import (
	"app/internal/database"
	"app/internal/model"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

// UserInfo получить инфо пользователя.
// @Summary Получить инфо пользователя
// @Description Предоставляет информацию юзера.
// @Accept json
// @Produce json
// @Success 200 {object} model.CodeResponse "Информация получена"
// @Failure 400 {object} model.ErrorResponse "Не удалось получить информацию"
// @Tags Profile
// @Security CookieAuth
// @Router /v1/user_info [get]
func UserInfo(context *gin.Context) {
	ID := context.MustGet("ID").(string)
	var user model.UserInfo
	err := database.Db.QueryRow("SELECT user_id, name, is_admin FROM atomic_users WHERE user_id = $1", ID).Scan(&user.ID, &user.Name, &user.IdAdmin)
	context.JSON(http.StatusOK, gin.H{"email": user.ID, "name": user.Name, "is_admin": user.IdAdmin})
	fmt.Println(err)
}
