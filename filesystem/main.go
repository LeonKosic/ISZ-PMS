package main

import (
	"pms/filesystem/internal/server"
)

func main() {
	server.RunServer("PMS", ":7070")
}
