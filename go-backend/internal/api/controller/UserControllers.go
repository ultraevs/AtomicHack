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
	Email := context.MustGet("Email").(string)
	var user model.UserInfo
	err := database.Db.QueryRow("SELECT email, name, is_admin FROM atomic_users WHERE email = $1", Email).Scan(&user.Email, &user.Name, &user.IdAdmin)
	context.JSON(http.StatusOK, gin.H{"email": user.Email, "name": user.Name, "is_admin": user.IdAdmin})
	fmt.Println(err)
}
