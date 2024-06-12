package config

type Config struct {
	Host string
	Port string
	Dir  string
}

func DefaultConfig() *Config {
	return &Config{
		Host: "localhost",
		Port: ":7070",
		Dir:  "files/",
	}
}
