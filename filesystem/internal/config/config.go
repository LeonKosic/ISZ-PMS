package config

type Config struct {
	Host  string
	Port  string
	Files string
}

func DefaultConfig() *Config {
	return &Config{
		Host:  "PMS",
		Port:  ":7070",
		Files: "../../resources/",
	}
}
