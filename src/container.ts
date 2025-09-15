// Example of a generator:
/*

// Docker Image Generator
const DockerImageGenerator: Fig.Generator = {
  script: ["docker", "image", "ls", "--format", "{{.Repository}}:{{.Tag}}"],
  postProcess: (out) => {
    return out.split("\n").map((image) => ({
      name: image,
      icon: "fig://icon?type=docker",
      description: "Docker Image",
    }));
  },
};

*/

// Image Generator:
const ImageGenerator: Fig.Generator = {
  script: ["container", "images", "list", "--quiet"],
  postProcess: (out) => {
    return out.split("\n").map((image) => ({
      name: image,
      icon: "fig://icon?type=docker",
      description: "Container Image",
    }));
  },
};

// Container Generator:
const ContainerGenerator: Fig.Generator = {
  script: ["container", "list", "--all", "--format", "json"],
  postProcess: (out) => {
    try {
      const containers = JSON.parse(out);
      return containers.map((container) => ({
        name: container.configuration.id,
        icon: "fig://icon?type=docker",
        description: `${container.status} - ${container.configuration.image.reference}`,
      }));
    } catch (error) {
      // Fallback to empty array if JSON parsing fails
      return [];
    }
  },
};

const containerSubcommands: Fig.Subcommand[] = [
  {
    name: "create",
    description: "Create a new container",
    args: [
      {
        name: "image",
        description: "Image name",
        generators: ImageGenerator,
      },
      {
        name: "arguments",
        description: "Container init process arguments",
        isVariadic: true,
      },
    ],
    options: [
      {
        name: ["-w", "--cwd", "--workdir"],
        description: "Current working directory for the container",
        args: {
          name: "cwd",
          description: "Current working directory for the container",
          template: "filepaths",
        },
      },
      {
        name: ["-e", "--env"],
        description: "Set environment variables",
        args: {
          name: "env",
          description: "Set environment variables",
        },
      },
      {
        name: "--env-file",
        description: "Read in a file of environment variables",
        args: {
          name: "env-file",
          description: "Read in a file of environment variables",
          template: "filepaths",
        },
      },
      {
        name: "--uid",
        description: "Set the uid for the process",
        args: {
          name: "uid",
          description: "Set the uid for the process",
        },
      },
      {
        name: "--gid",
        description: "Set the gid for the process",
        args: {
          name: "gid",
          description: "Set the gid for the process",
        },
      },
      {
        name: ["-i", "--interactive"],
        description: "Keep Stdin open even if not attached",
      },
      {
        name: ["-t", "--tty"],
        description: "Open a tty with the process",
      },
      {
        name: ["-u", "--user"],
        description: "Set the user for the process",
        args: {
          name: "user",
          description: "Set the user for the process",
        },
      },
      {
        name: ["-c", "--cpus"],
        description: "Number of CPUs to allocate to the container",
        args: {
          name: "cpus",
          description: "Number of CPUs to allocate to the container",
        },
      },
      {
        name: ["-m", "--memory"],
        description:
          "Amount of memory in bytes, kilobytes (K), megabytes (M), or gigabytes (G) for the container, with MB granularity (for example, 1024K will result in 1MB being allocated for the container)",
        args: {
          name: "memory",
          description:
            "Amount of memory in bytes, kilobytes (K), megabytes (M), or gigabytes (G) for the container, with MB granularity",
        },
      },
      {
        name: ["-d", "--detach"],
        description: "Run the container and detach from the process",
      },
      {
        name: "--entrypoint",
        description: "Override the entrypoint of the image",
        args: {
          name: "entrypoint",
          description: "Override the entrypoint of the image",
        },
      },
      {
        name: "--mount",
        description:
          "Add a mount to the container (type=<>,source=<>,target=<>,readonly)",
        args: {
          name: "mount",
          description:
            "Add a mount to the container (type=<>,source=<>,target=<>,readonly)",
        },
      },
      {
        name: "--publish-socket",
        description:
          "Publish a socket from container to host (format: host_path:container_path)",
        args: {
          name: "publish-socket",
          description:
            "Publish a socket from container to host (format: host_path:container_path)",
        },
      },
      {
        name: "--tmpfs",
        description: "Add a tmpfs mount to the container at the given path",
        args: {
          name: "tmpfs",
          description: "Add a tmpfs mount to the container at the given path",
        },
      },
      {
        name: "--name",
        description:
          "Assign a name to the container. If excluded will be a generated UUID",
        args: {
          name: "name",
          description:
            "Assign a name to the container. If excluded will be a generated UUID",
        },
      },
      {
        name: ["--remove", "--rm"],
        description: "Remove the container after it stops",
      },
      {
        name: "--os",
        description:
          "Set OS if image can target multiple operating systems (default: linux)",
        args: {
          name: "os",
          description:
            "Set OS if image can target multiple operating systems (default: linux)",
        },
      },
      {
        name: ["-a", "--arch"],
        description:
          "Set arch if image can target multiple architectures (default: arm64)",
        args: {
          name: "arch",
          description:
            "Set arch if image can target multiple architectures (default: arm64)",
          suggestions: ["arm64", "amd64", "x86", "x86_64"],
        },
      },
      {
        name: ["-v", "--volume"],
        description: "Bind mount a volume into the container",
        args: {
          name: "volume",
          description: "Bind mount a volume into the container",
        },
      },
      {
        name: "--kernel",
        description: "Set a custom kernel path",
        args: {
          name: "kernel",
          description: "Set a custom kernel path",
        },
      },
      {
        name: "--network",
        description: "Attach the container to a network",
        args: {
          name: "network",
          description: "Attach the container to a network",
        },
      },
      {
        name: "--cidfile",
        description: "Write the container ID to the path provided",
        args: {
          name: "cidfile",
          description: "Write the container ID to the path provided",
        },
      },
      {
        name: "--no-dns",
        description: "Do not configure DNS in the container",
      },
      {
        name: "--dns",
        description: "DNS nameserver IP address",
        args: {
          name: "dns",
          description: "DNS nameserver IP address",
        },
      },
      {
        name: "--dns-domain",
        description: "Default DNS domain",
        args: {
          name: "dns-domain",
          description: "Default DNS domain",
        },
      },
      {
        name: "--dns-search",
        description: "DNS search domains",
        args: {
          name: "dns-search",
          description: "DNS search domains",
        },
      },
      {
        name: "--dns-option",
        description: "DNS options",
        args: {
          name: "dns-option",
          description: "DNS options",
        },
      },
      {
        name: ["-l", "--label"],
        description: "Add a key=value label to the container",
        args: {
          name: "label",
          description: "Add a key=value label to the container",
        },
      },
      {
        name: "--scheme",
        description:
          "Scheme to use when connecting to the container registry. One of (http, https, auto) (default: auto)",
        args: {
          name: "scheme",
          description:
            "Scheme to use when connecting to the container registry. One of (http, https, auto) (default: auto)",
          suggestions: ["http", "https", "auto"],
        },
      },
    ],
  },
  {
    name: ["delete", "rm"],
    description: "Delete one or more containers",
    args: {
      name: "container-ids",
      description: "Container IDs/names",
      generators: ContainerGenerator,
      isVariadic: true,
    },
    options: [
      {
        name: ["-f", "--force"],
        description: "Force the removal of one or more running containers",
      },
      {
        name: ["-a", "--all"],
        description: "Remove all containers",
      },
    ],
  },
  {
    name: "exec",
    description: "Run a new command in a running container",
    args: [
      {
        name: "container-id",
        description: "Running containers ID",
        generators: ContainerGenerator,
      },
      {
        name: "arguments",
        description: "New process arguments",
        isVariadic: true,
      },
    ],
    options: [
      {
        name: ["-w", "--cwd", "--workdir"],
        description: "Current working directory for the container",
        args: {
          name: "cwd",
          description: "Current working directory for the container",
        },
      },
      {
        name: ["-e", "--env"],
        description: "Set environment variables",
        args: {
          name: "env",
          description: "Set environment variables",
        },
      },
      {
        name: "--env-file",
        description: "Read in a file of environment variables",
        args: {
          name: "env-file",
          description: "Read in a file of environment variables",
          template: "filepaths",
        },
      },
      {
        name: "--uid",
        description: "Set the uid for the process",
        args: {
          name: "uid",
          description: "Set the uid for the process",
        },
      },
      {
        name: "--gid",
        description: "Set the gid for the process",
        args: {
          name: "gid",
          description: "Set the gid for the process",
        },
      },
      {
        name: ["-i", "--interactive"],
        description: "Keep Stdin open even if not attached",
      },
      {
        name: ["-t", "--tty"],
        description: "Open a tty with the process",
      },
      {
        name: ["-u", "--user"],
        description: "Set the user for the process",
        args: {
          name: "user",
          description: "Set the user for the process",
        },
      },
    ],
  },
  {
    name: "inspect",
    description: "Display information about one or more containers",
    args: {
      name: "containers",
      description: "Containers to inspect",
      isVariadic: true,
      generators: ContainerGenerator,
    },
    options: [
      {
        name: "--debug",
        description: "Enable debug output",
      },
    ],
  },
  {
    name: "kill",
    description: "Kill one or more running containers",
    args: {
      name: "container-ids",
      description: "Container IDs",
      isVariadic: true,
      generators: ContainerGenerator,
    },
    options: [
      {
        name: ["-s", "--signal"],
        description: "Signal to send the container(s) (default: KILL)",
        args: {
          name: "signal",
          description: "Signal to send the container(s) (default: KILL)",
        },
      },
      {
        name: ["-a", "--all"],
        description: "Kill all running containers",
      },
    ],
  },
  {
    name: "list",
    description: "List containers",
    options: [
      {
        name: ["-a", "--all"],
        description: "Show stopped containers as well",
      },
      {
        name: ["-q", "--quiet"],
        description: "Only output the container ID",
      },
      {
        name: "--format",
        description:
          "Format of the output (values: json, table; default: table)",
        args: {
          name: "format",
          description: "Format of the output",
          suggestions: [
            {
              name: "json",
              description: "Output in JSON format",
            },
            {
              name: "table",
              description: "Output in table format",
            },
          ],
        },
      },
      {
        name: "--debug",
        description: "Enable debug output",
      },
    ],
  },
  {
    name: "logs",
    description: "Fetch container stdio or boot logs",
    args: {
      name: "container",
      description: "Container to fetch logs for",
      generators: ContainerGenerator,
    },
    options: [
      {
        name: "--debug",
        description: "Enable debug output [environment: CONTAINER_DEBUG]",
      },
      {
        name: ["-f", "--follow"],
        description: "Follow log output",
      },
      {
        name: "--boot",
        description: "Display the boot log for the container instead of stdio",
      },
      {
        name: "-n",
        description:
          "Number of lines to show from the end of the logs. If not provided this will print all of the logs",
        args: {
          name: "n",
          description: "Number of lines to show from the end of the logs",
        },
      },
    ],
  },
  {
    name: "run",
    description: "Run a container",
    args: [
      {
        name: "image",
        description: "Image name",
        generators: ImageGenerator,
      },
      {
        name: "arguments",
        description: "Container init process arguments",
        isVariadic: true,
      },
    ],
    options: [
      {
        name: ["-w", "--cwd", "--workdir"],
        description: "Current working directory for the container",
        args: {
          name: "cwd",
          description: "Current working directory for the container",
          template: "filepaths",
        },
      },
      {
        name: ["-e", "--env"],
        description: "Set environment variables",
        args: {
          name: "env",
          description: "Set environment variables",
        },
      },
      {
        name: "--env-file",
        description: "Read in a file of environment variables",
        args: {
          name: "env-file",
          description: "Read in a file of environment variables",
          template: "filepaths",
        },
      },
      {
        name: "--uid",
        description: "Set the uid for the process",
        args: {
          name: "uid",
          description: "Set the uid for the process",
        },
      },
      {
        name: "--gid",
        description: "Set the gid for the process",
        args: {
          name: "gid",
          description: "Set the gid for the process",
        },
      },
      {
        name: ["-i", "--interactive"],
        description: "Keep Stdin open even if not attached",
      },
      {
        name: ["-t", "--tty"],
        description: "Open a tty with the process",
      },
      {
        name: ["-u", "--user"],
        description: "Set the user for the process",
        args: {
          name: "user",
          description: "Set the user for the process",
        },
      },
      {
        name: ["-c", "--cpus"],
        description: "Number of CPUs to allocate to the container",
        args: {
          name: "cpus",
          description: "Number of CPUs to allocate to the container",
        },
      },
      {
        name: ["-m", "--memory"],
        description:
          "Amount of memory in bytes, kilobytes (K), megabytes (M), or gigabytes (G) for the container, with MB granularity (for example, 1024K will result in 1MB being allocated for the container)",
        args: {
          name: "memory",
          description:
            "Amount of memory in bytes, kilobytes (K), megabytes (M), or gigabytes (G) for the container, with MB granularity",
        },
      },
      {
        name: ["-d", "--detach"],
        description: "Run the container and detach from the process",
      },
      {
        name: "--entrypoint",
        description: "Override the entrypoint of the image",
        args: {
          name: "entrypoint",
          description: "Override the entrypoint of the image",
        },
      },
      {
        name: "--mount",
        description:
          "Add a mount to the container (type=<>,source=<>,target=<>,readonly)",
        args: {
          name: "mount",
          description:
            "Add a mount to the container (type=<>,source=<>,target=<>,readonly)",
        },
      },
      {
        name: "--publish-socket",
        description:
          "Publish a socket from container to host (format: host_path:container_path)",
        args: {
          name: "publish-socket",
          description:
            "Publish a socket from container to host (format: host_path:container_path)",
        },
      },
      {
        name: "--tmpfs",
        description: "Add a tmpfs mount to the container at the given path",
        args: {
          name: "tmpfs",
          description: "Add a tmpfs mount to the container at the given path",
        },
      },
      {
        name: "--name",
        description:
          "Assign a name to the container. If excluded will be a generated UUID",
        args: {
          name: "name",
          description:
            "Assign a name to the container. If excluded will be a generated UUID",
        },
      },
      {
        name: ["--remove", "--rm"],
        description: "Remove the container after it stops",
      },
      {
        name: "--os",
        description:
          "Set OS if image can target multiple operating systems (default: linux)",
        args: {
          name: "os",
          description:
            "Set OS if image can target multiple operating systems (default: linux)",
        },
      },
      {
        name: ["-a", "--arch"],
        description:
          "Set arch if image can target multiple architectures (default: arm64)",
        args: {
          name: "arch",
          description:
            "Set arch if image can target multiple architectures (default: arm64)",
        },
      },
      {
        name: ["-v", "--volume"],
        description: "Bind mount a volume into the container",
        args: {
          name: "volume",
          description: "Bind mount a volume into the container",
        },
      },
      {
        name: "--kernel",
        description: "Set a custom kernel path",
        args: {
          name: "kernel",
          description: "Set a custom kernel path",
        },
      },
      {
        name: "--network",
        description: "Attach the container to a network",
        args: {
          name: "network",
          description: "Attach the container to a network",
        },
      },
      {
        name: "--cidfile",
        description: "Write the container ID to the path provided",
        args: {
          name: "cidfile",
          description: "Write the container ID to the path provided",
        },
      },
      {
        name: "--no-dns",
        description: "Do not configure DNS in the container",
      },
      {
        name: "--dns",
        description: "DNS nameserver IP address",
        args: {
          name: "dns",
          description: "DNS nameserver IP address",
        },
      },
      {
        name: "--dns-domain",
        description: "Default DNS domain",
        args: {
          name: "dns-domain",
          description: "Default DNS domain",
        },
      },
      {
        name: "--dns-search",
        description: "DNS search domains",
        args: {
          name: "dns-search",
          description: "DNS search domains",
        },
      },
      {
        name: "--dns-option",
        description: "DNS options",
        args: {
          name: "dns-option",
          description: "DNS options",
        },
      },
      {
        name: ["-l", "--label"],
        description: "Add a key=value label to the container",
        args: {
          name: "label",
          description: "Add a key=value label to the container",
        },
      },
      {
        name: "--scheme",
        description:
          "Scheme to use when connecting to the container registry. One of (http, https, auto) (default: auto)",
        args: {
          name: "scheme",
          description:
            "Scheme to use when connecting to the container registry. One of (http, https, auto) (default: auto)",
        },
      },
      {
        name: "--debug",
        description: "Enable debug output [environment: CONTAINER_DEBUG]",
      },
      {
        name: "--disable-progress-updates",
        description: "Disable progress bar updates",
      },
    ],
  },
  {
    name: "start",
    description: "Start a container",
    args: {
      name: "container-id",
      description: "Container ID",
      isVariadic: true,
      generators: ContainerGenerator,
    },
    options: [
      {
        name: ["-a", "--attach"],
        description: "Attach STDOUT/STDERR",
      },
      {
        name: ["-i", "--interactive"],
        description: "Attach container's STDIN",
      },
    ],
  },
  {
    name: "stop",
    description: "Stop a container",
    args: {
      name: "container-id",
      description: "Container ID",
      isVariadic: true,
      generators: ContainerGenerator,
    },
    options: [
      {
        name: ["-a", "--all"],
        description: "Stop all running containers",
      },
      {
        name: ["-s", "--signal"],
        description: "Signal to send the container(s) (default: SIGTERM)",
        args: {
          name: "signal",
          description: "Signal to send the container(s) (default: SIGTERM)",
        },
      },
      {
        name: ["-t", "--time"],
        description:
          "Seconds to wait before killing the container(s) (default: 5)",
        args: {
          name: "time",
          description:
            "Seconds to wait before killing the container(s) (default: 5)",
        },
      },
    ],
  },
];

const imageSubcommands: Fig.Subcommand[] = [
  {
    name: "build",
    description: "Build an image from a Dockerfile",
    args: {
      name: "context-dir",
      description: "Build directory (default: .)",
      isOptional: true,
    },
    options: [
      {
        name: ["-c", "--cpus"],
        description: "Number of CPUs to allocate to the container (default: 2)",
        args: {
          name: "cpus",
          description: "Number of CPUs to allocate to the container",
        },
      },
      {
        name: ["-m", "--memory"],
        description:
          "Amount of memory in bytes, kilobytes (K), megabytes (M), or gigabytes (G) for the container, with MB granularity (for example, 1024K will result in 1MB being allocated for the container) (default: 2048MB)",
        args: {
          name: "memory",
          description:
            "Amount of memory in bytes, kilobytes (K), megabytes (M), or gigabytes (G) for the container, with MB granularity",
        },
      },
      {
        name: "--build-arg",
        description: "Set build-time variables",
        args: {
          name: "key=val",
          description: "Set build-time variables",
        },
      },
      {
        name: ["-f", "--file"],
        description: "Path to Dockerfile (default: Dockerfile)",
        args: {
          name: "path",
          description: "Path to Dockerfile",
        },
      },
      {
        name: ["-l", "--label"],
        description: "Set a label",
        args: {
          name: "key=val",
          description: "Set a label",
        },
      },
      {
        name: "--no-cache",
        description: "Do not use cache",
      },
      {
        name: ["-o", "--output"],
        description: "Output configuration for the build (default: type=oci)",
        args: {
          name: "value",
          description: "Output configuration for the build",
        },
      },
      {
        name: "--arch",
        description: "Set the build architecture (default: arm64)",
        args: {
          name: "value",
          description: "Set the build architecture",
        },
      },
      {
        name: "--os",
        description: "Set the build os (default: linux)",
        args: {
          name: "value",
          description: "Set the build os",
        },
      },
      {
        name: "--progress",
        description: "Progress type - one of [auto|plain|tty] (default: auto)",
        args: {
          name: "type",
          description: "Progress type",
          suggestions: [
            {
              name: "auto",
              description: "Automatic progress type",
            },
            {
              name: "plain",
              description: "Plain progress type",
            },
            {
              name: "tty",
              description: "TTY progress type",
            },
          ],
        },
      },
      {
        name: "--vsock-port",
        description: "Builder-shim vsock port (default: 8088)",
        args: {
          name: "port",
          description: "Builder-shim vsock port",
        },
      },
      {
        name: ["-t", "--tag"],
        description:
          "Name for the built image (default: 9d4588bd-d62a-4b13-beb8-d2774d9e3dd1)",
        args: {
          name: "name",
          description: "Name for the built image",
        },
      },
      {
        name: "--target",
        description: "Set the target build stage",
        args: {
          name: "stage",
          description: "Set the target build stage",
        },
      },
      {
        name: ["-q", "--quiet"],
        description: "Suppress build output",
      },
    ],
  },
  {
    name: ["images", "image", "i"],
    description: "Manage images",
    subcommands: [
      {
        name: "inspect",
        description: "Display information about one or more images",
        args: {
          name: "images",
          description: "Images to inspect",
          isVariadic: true,
          generators: ImageGenerator,
        },
        options: [
          {
            name: "--debug",
            description: "Enable debug output [environment: CONTAINER_DEBUG]",
          },
        ],
      },
      {
        name: ["list", "ls"],
        description: "List images",
        options: [
          {
            name: ["-q", "--quiet"],
            description: "Only output the image name",
          },
          {
            name: ["-v", "--verbose"],
            description: "Verbose output",
          },
          {
            name: "--format",
            description:
              "Format of the output (values: json, table; default: table)",
            args: {
              name: "format",
              description: "Format of the output",
              suggestions: ["json", "table"],
            },
          },
          {
            name: "--debug",
            description: "Enable debug output [environment: CONTAINER_DEBUG]",
          },
        ],
      },
      {
        name: "load",
        description: "Load images from an OCI compatible tar archive",
        options: [
          {
            name: "--debug",
            description: "Enable debug output [environment: CONTAINER_DEBUG]",
          },
          {
            name: ["-i", "--input"],
            description: "Path to the tar archive to load images from",
            args: {
              name: "input",
              description: "Path to the tar archive",
              template: "filepaths",
            },
          },
        ],
      },
      {
        name: "prune",
        description: "Remove unreferenced and dangling images",
        options: [
          {
            name: "--debug",
            description: "Enable debug output [environment: CONTAINER_DEBUG]",
          },
        ],
      },
      {
        name: "pull",
        description: "Pull an image",
        args: {
          name: "reference",
        },
        options: [
          {
            name: "--debug",
            description: "Enable debug output [environment: CONTAINER_DEBUG]",
          },
          {
            name: "--scheme",
            description:
              "Scheme to use when connecting to the container registry. One of (http, https, auto) (default: auto)",
            args: {
              name: "scheme",
              description: "Scheme to use",
              suggestions: ["http", "https", "auto"],
            },
          },
          {
            name: "--disable-progress-updates",
            description: "Disable progress bar updates",
          },
          {
            name: "--platform",
            description:
              "Platform string in the form 'os/arch/variant'. Example 'linux/arm64/v8', 'linux/amd64'",
            args: {
              name: "platform",
              description: "Platform string",
              suggestions: ["linux/arm64/v8", "linux/amd64"],
            },
          },
        ],
      },
      {
        name: "push",
        description: "Push an image",
        args: {
          name: "reference",
        },
        options: [
          {
            name: "--debug",
            description: "Enable debug output [environment: CONTAINER_DEBUG]",
          },
          {
            name: "--scheme",
            description:
              "Scheme to use when connecting to the container registry. One of (http, https, auto) (default: auto)",
            args: {
              name: "scheme",
              description: "Scheme to use",
              suggestions: ["http", "https", "auto"],
            },
          },
          {
            name: "--disable-progress-updates",
            description: "Disable progress bar updates",
          },
          {
            name: "--platform",
            description:
              "Platform string in the form 'os/arch/variant'. Example 'linux/arm64/v8', 'linux/amd64'",
            args: {
              name: "platform",
              description: "Platform string",
              suggestions: ["linux/arm64/v8", "linux/amd64"],
            },
          },
        ],
      },
      {
        name: ["delete", "rm"],
        description: "Remove one or more images",
        args: {
          name: "images",
          isVariadic: true,
          generators: ImageGenerator,
        },
        options: [
          {
            name: ["-a", "--all"],
            description: "Remove all images",
          },
          {
            name: "--debug",
            description: "Enable debug output [environment: CONTAINER_DEBUG]",
          },
        ],
      },
      {
        name: "save",
        description: "Save an image as an OCI compatible tar archive",
        args: {
          name: "reference",
        },
        options: [
          {
            name: "--debug",
            description: "Enable debug output [environment: CONTAINER_DEBUG]",
          },
          {
            name: "--platform",
            description:
              "Platform string in the form 'os/arch/variant'. Example 'linux/arm64/v8', 'linux/amd64'",
            args: {
              name: "platform",
              description: "Platform string",
            },
          },
          {
            name: ["-o", "--output"],
            description: "Path to save the image tar archive",
            args: {
              name: "output",
              description: "Path to save the image tar archive",
              template: "filepaths",
            },
          },
        ],
      },
      {
        name: "tag",
        description: "Tag an image",
        args: [
          {
            name: "source",
            description: "SOURCE_IMAGE[:TAG]",
          },
          {
            name: "target",
            description: "TARGET_IMAGE[:TAG]",
          },
        ],
        options: [
          {
            name: "--debug",
            description: "Enable debug output [environment: CONTAINER_DEBUG]",
          },
        ],
      },
    ],
  },
  {
    name: ["registry", "r"],
    description: "Manage registry configurations",
    subcommands: [
      {
        name: "login",
        description: "Login to a registry",
        args: {
          name: "server",
          description: "Registry server name",
        },
        options: [
          {
            name: ["-u", "--username"],
            description: "Username",
            args: {
              name: "username",
              description: "Username",
            },
          },
          {
            name: "--password-stdin",
            description: "Take the password from stdin",
          },
          {
            name: "--scheme",
            description:
              "Scheme to use when connecting to the container registry. One of (http, https, auto) (default: auto)",
            args: {
              name: "scheme",
              description: "Scheme to use",
              suggestions: ["http", "https", "auto"],
            },
          },
        ],
      },
      {
        name: "logout",
        description: "Log out from a registry",
        args: {
          name: "registry",
          description: "Registry server name",
        },
        options: [
          {
            name: "--debug",
            description: "Enable debug output [environment: CONTAINER_DEBUG]",
          },
        ],
      },
      {
        name: "default",
        description: "Manage the default image registry",
        subcommands: [
          {
            name: "set",
            description: "Set the default registry",
            args: {
              name: "host",
            },
            options: [
              {
                name: "--debug",
                description:
                  "Enable debug output [environment: CONTAINER_DEBUG]",
              },
              {
                name: "--scheme",
                description:
                  "Scheme to use when connecting to the container registry. One of (http, https, auto) (default: auto)",
                args: {
                  name: "scheme",
                  description: "Scheme to use",
                  suggestions: ["http", "https", "auto"],
                },
              },
            ],
          },
          {
            name: ["unset", "clear"],
            description: "Unset the default registry",
          },
          {
            name: "inspect",
            description: "Display the default registry domain",
          },
        ],
      },
    ],
  },
];

const otherSubcommands: Fig.Subcommand[] = [
  {
    name: "builder",
    description: "Manage an image builder instance",
    subcommands: [
      {
        name: "start",
        description: "Start builder",
        options: [
          {
            name: ["-c", "--cpus"],
            description:
              "Number of CPUs to allocate to the container (default: 2)",
            args: {
              name: "cpus",
              description: "Number of CPUs to allocate to the container",
            },
          },
          {
            name: ["-m", "--memory"],
            description:
              "Amount of memory in bytes, kilobytes (K), megabytes (M), or gigabytes (G) for the container, with MB granularity (for example, 1024K will result in 1MB being allocated for the container) (default: 2048MB)",
            args: {
              name: "memory",
              description: "Amount of memory for the container",
            },
          },
        ],
      },
      {
        name: "status",
        description: "Print builder status",
        options: [
          {
            name: "--json",
            description: "Display detailed status in json format",
          },
        ],
      },
      {
        name: "stop",
        description: "Stop builder",
      },
      {
        name: "delete",
        description: "Delete builder",
        options: [
          {
            name: ["-f", "--force"],
            description: "Force delete builder even if it is running",
          },
        ],
      },
    ],
  },
  {
    name: ["network", "n"],
    description: "Manage container networks",
    subcommands: [
      {
        name: "create",
        description: "Create a new network",
        args: {
          name: "name",
          description: "Network name",
        },
        options: [
          {
            name: "--debug",
            description: "Enable debug output [environment: CONTAINER_DEBUG]",
          },
        ],
      },
      {
        name: ["delete", "rm"],
        description: "Delete one or more networks",
        args: {
          name: "network-names",
          description: "Network names",
          isVariadic: true,
        },
        options: [
          {
            name: ["-a", "--all"],
            description: "Remove all networks",
          },
          {
            name: "--debug",
            description: "Enable debug output [environment: CONTAINER_DEBUG]",
          },
        ],
      },
      {
        name: ["list", "ls"],
        description: "List networks",
        options: [
          {
            name: ["-q", "--quiet"],
            description: "Only output the network name",
          },
          {
            name: "--format",
            description:
              "Format of the output (values: json, table; default: table)",
            args: {
              name: "format",
              description: "Format of the output",
              suggestions: ["json", "table"],
            },
          },
          {
            name: "--debug",
            description: "Enable debug output [environment: CONTAINER_DEBUG]",
          },
        ],
      },
      {
        name: "inspect",
        description: "Display information about one or more networks",
        args: {
          name: "networks",
          description: "Networks to inspect",
          isVariadic: true,
        },
        options: [
          {
            name: "--debug",
            description: "Enable debug output [environment: CONTAINER_DEBUG]",
          },
        ],
      },
    ],
  },
  {
    name: ["system", "s"],
    description: "Manage system components",
    subcommands: [
      {
        name: "dns",
        description: "Manage local DNS domains",
        subcommands: [
          {
            name: "create",
            description:
              "Create a local DNS domain for containers (must run as an administrator)",
            args: {
              name: "domain-name",
              description: "The local domain name",
            },
          },
          {
            name: ["delete", "rm"],
            description:
              "Delete a local DNS domain (must run as an administrator)",
            args: {
              name: "domain-name",
              description: "The local domain name",
            },
          },
          {
            name: ["list", "ls"],
            description: "List local DNS domains",
          },
          {
            name: "default",
            description: "Set or unset the default local DNS domain",
            subcommands: [
              {
                name: "set",
                description: "Set the default local DNS domain",
                args: {
                  name: "domain-name",
                  description:
                    "The default `--domain-name` to use for the `create` or `run` command",
                },
              },
              {
                name: ["unset", "clear"],
                description: "Unset the default local DNS domain",
              },
              {
                name: "inspect",
                description: "Display the default local DNS domain",
              },
            ],
          },
        ],
      },
      {
        name: "logs",
        description: "Fetch system logs for `container` services",
        options: [
          {
            name: "--debug",
            description: "Enable debug output [environment: CONTAINER_DEBUG]",
          },
          {
            name: "--last",
            description:
              "Fetch logs starting from the specified time period (minus the current time); supported formats: m, h, d (default: 5m)",
            args: {
              name: "last",
              description: "Time period (e.g., 5m, 1h, 1d)",
            },
          },
          {
            name: ["-f", "--follow"],
            description: "Follow log output",
          },
        ],
      },
      {
        name: "start",
        description: "Start `container` services",
        options: [
          {
            name: ["-p", "--path"],
            description:
              "Path to the `container-apiserver` binary (default: /usr/local/bin/container)",
            args: {
              name: "path",
              description: "Path to the `container-apiserver` binary",
            },
          },
          {
            name: "--debug",
            description: "Enable debug logging for the runtime daemon",
          },
          {
            name: "--enable-kernel-install",
            description:
              "Specify whether the default kernel should be installed or not",
          },
          {
            name: "--disable-kernel-install",
            description:
              "Specify whether the default kernel should be installed or not",
          },
        ],
      },
      {
        name: "stop",
        description: "Stop all `container` services",
        options: [
          {
            name: ["-p", "--prefix"],
            description:
              "Launchd prefix for `container` services (default: com.apple.container.)",
            args: {
              name: "prefix",
              description: "Launchd prefix",
            },
          },
        ],
      },
      {
        name: "status",
        description: "Show the status of `container` services",
        options: [
          {
            name: ["-p", "--prefix"],
            description:
              "Launchd prefix for `container` services (default: com.apple.container.)",
            args: {
              name: "prefix",
              description: "Launchd prefix",
            },
          },
        ],
      },
      {
        name: "kernel",
        description: "Manage the default kernel configuration",
        subcommands: [
          {
            name: "set",
            description: "Set the default kernel",
            options: [
              {
                name: "--binary",
                description:
                  "Path to the binary to set as the default kernel. If used with --tar, this points to a location inside the tar",
                args: {
                  name: "binary",
                  description: "Path to kernel binary",
                },
              },
              {
                name: "--tar",
                description:
                  "Filesystem path or remote URL to a tar ball that contains the kernel to use",
                args: {
                  name: "tar",
                  description: "Path or URL to kernel tar ball",
                },
              },
              {
                name: "--arch",
                description:
                  "The architecture of the kernel binary. One of (amd64, arm64) (default: arm64)",
                args: {
                  name: "arch",
                  description: "Architecture",
                  suggestions: ["amd64", "arm64"],
                },
              },
              {
                name: "--recommended",
                description:
                  "Download and install the recommended kernel as the default. This flag ignores any other arguments",
              },
            ],
          },
        ],
      },
    ],
  },
];

const containerSubcommandsAll = [
  ...containerSubcommands,
  ...imageSubcommands,
  ...otherSubcommands,
];

const completionSpec: Fig.Spec = {
  name: "container",
  description: "A container platform for macOS",
  subcommands: containerSubcommandsAll,
  options: [
    {
      name: ["--help", "-h"],
      description: "Show help information",
      isPersistent: true,
    },
    {
      name: "--version",
      description: "Show the version",
      isPersistent: true,
    },
    {
      name: "--debug",
      description: "Enable debug output [environment: CONTAINER_DEBUG]",
      isPersistent: true,
    },
  ],
  // Only uncomment if container takes an argument
  // args: {}
};
export default completionSpec;
