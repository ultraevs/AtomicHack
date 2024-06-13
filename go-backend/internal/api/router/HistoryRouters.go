package router

import (
	"app/internal/api/controller"
	"app/internal/api/middleware"
	"github.com/gin-gonic/gin"
)

func (router *Router) HistoryRouters(group *gin.RouterGroup) {
	group.GET("/gethistory", middleware.CookieMiddleware(), controller.GetHistory)
	group.GET("token", controller.GenerateUserToken)
	group.POST("addhistory", middleware.CookieMiddleware(), controller.AddHistory)
}
