package config

type Config struct {
	Host string
	Port string
}

func DefaultConfig() *Config {
	return &Config{
		Host: "PMS",
		Port: ":7070",
	}
}
