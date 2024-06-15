package router

import (
	"app/internal/api/controller"
	"github.com/gin-gonic/gin"
)

func (router *Router) AuthRoutes(group *gin.RouterGroup) {
	group.POST("/login", controller.Login)
}
