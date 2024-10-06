
# ✨ CLI Envy
A simple CLI to print/copy files from a source directory! Usefull for managing `env` files 😉


## Installation

Download your executable file from [releases](https://github.com/Unarray/cli-envy/releases) or build it your self.
Then here we go, you can now use EnvyCLI!
## Usage/Examples

### Print/copy your resource
```sh
# Print your resource content inside your terminal
envy get your-resource

# Create/copy your resource content inside a file (here inside a `.env` file)
envy get your-resource > .env
```

### Command `envy --help`
```
@unarray/cli-envy - v1.0.0
Usage: envy <cmd> [opts]

Commands:
  envy                      Interactive CLI to copy your resources     [default]
  envy get <resource>       Get your resource content
  envy get-dir              Get your resources directory path
  envy list                 List your resources
  envy set-dir <directory>  Set your resources directory path

Options:
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/Unarray/cli-envy
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  bun install
```

Install the local CLI globaly 

```bash
  bun run link-cli
```

Build the CLI

```bash
  bun run build
```
## Support

For support, [create a github issue](https://github.com/Unarray/cli-envy/issues/new)