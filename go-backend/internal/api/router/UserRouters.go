package router

import (
	"app/internal/api/controller"
	"app/internal/api/middleware"
	"github.com/gin-gonic/gin"
)

func (router *Router) UserRoutes(group *gin.RouterGroup) {
	group.GET("/user_info", middleware.CookieMiddleware(), controller.UserInfo)
}
