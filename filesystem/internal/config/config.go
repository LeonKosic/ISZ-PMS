package config

type Config struct {
	Host string
	Port string
	Dir  string
	Commit string
}

func DefaultConfig() *Config {
	return &Config{
		Host: "localhost",
		Port: ":7070",
		Dir:  "files/",
		Commit: "commits/"
	}
}
