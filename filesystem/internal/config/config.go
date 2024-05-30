package config

type Config struct {
	Host string
	Port string
}

func DefaultConfig() *Config {
	return &Config{
		Host: "localhost",
		Port: ":7070",
	}
}
