package router

import (
	"app/internal/api/controller"
	"app/internal/api/middleware"
	"github.com/gin-gonic/gin"
)

func (router *Router) AdminRoutes(group *gin.RouterGroup) {
	group.GET("/getrecognitions", middleware.CookieMiddleware(), controller.GetRecognitions)
}
