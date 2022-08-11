export type Metadata = {
    name?: string;
    namespace?: string;
    labels?: Record<string, string>;
    annotations?: Record<string, string>;
};

export type Deployment = {
    kind: string;
    apiVersion: string;
    metadata: Metadata;
    spec: DeploymentSpec
};

export type DeploymentSpec = {
    replicas: number;
    selector: {
        matchLabels: Record<string, string>;
    };
    template: {
        metadata: Metadata;
        spec: PodSpec;
    };
    strategy: {
        type: "Recreate" | "RollingUpdate"; // Recreate RollingUpdate
        rollingUpdate?: {
            MaxUnavailable: string | number;
            MaxSurge: string | number;
        };
    };
    minReadySeconds: number;
    revisionHistoryLimit: number;
    paused: boolean;
    progressDeadlineSeconds: number;
}

export type PodSpec = {
    volumes?: Volume[]
    initContainers?: Container[]
    containers: Container[]
    restartPolicy: "Always" | "OnFailure" | "Never"
    terminationGracePeriodSeconds: number
    dnsPolicy: "ClusterFirstWithHostNet" | "ClusterFirst" | "Default" | "None"
    nodeSelector?: Record<string, string>
    serviceAccountName?: string
    hostNetwork?: boolean
    hostPID?: boolean
    hostIPC?: boolean
    shareProcessNamespace?: boolean
    imagePullSecrets?: string[]
    hostname?: string
}

export const DefaultContainer: Container = {
    name: "example-container",
    image: "nginx",
    resources: {
        limits: {
            cpu: 1,
            memory: "0.5Gi"
        },
        requests: {
            cpu: 1,
            memory: "0.5Gi"
        }
    },
    imagePullPolicy: "IfNotPresent"
}



export type Container = {
    name: string
    image: string
    command?: string[]
    args?: string[]
    resources: {
        limits: ResourceList
        requests: ResourceList
    }
    volumeMounts?: VolumeMount[]
    imagePullPolicy: "Always" | "Never" | "IfNotPresent"

    // TODO
    // livenessProbe: {}
    // readinessProbe: {}
}

export type ResourceList = {
    memory: string
    cpu: string | number
}

export type Volume = {
    name: string
    hostPath?: {
        path: string
        type: "" | "DirectoryOrCreate" | "Directory" | "FileOrCreate" | "File" | "Socket" | "CharDevice" | "BlockDevice"
    }
    emptyDir?: {
        sizeLimit: string
    }
    persistentVolumeClaim?: {
        claimName: string
        readOnly: boolean
    }
}

export type VolumeMount = {
    name: string
    readOnly: boolean
    mountPath: string
    subPath: string
}


export const DefaultPodSpec: PodSpec = {
    initContainers: [],
    containers: [DefaultContainer],
    restartPolicy: "Always",
    dnsPolicy: "ClusterFirst",
    terminationGracePeriodSeconds: 30,
}
export const DefaultDeploymentSpec: DeploymentSpec = {
    replicas: 1,
    selector: {
        matchLabels: {},
    },
    template: {
        metadata: {
            labels: {},
        },
        spec: DefaultPodSpec,
    },
    strategy: {
        type: "RollingUpdate",
        rollingUpdate: {
            MaxSurge: "25%",
            MaxUnavailable: "25%",
        },
    },
    minReadySeconds: 0,
    revisionHistoryLimit: 10,
    progressDeadlineSeconds: 600,
    paused: false,
}

export const DefaultDeployment: Deployment = {
    kind: "Deployment",
    apiVersion: "apps/v1",
    metadata: {
        name: "example",
        namespace: "default",
        labels: {},
        annotations: {},
    },
    spec: DefaultDeploymentSpec,
}