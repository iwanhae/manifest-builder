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
        spec: {};
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

export type PodSpect = {
    volumes: Volume[]
    initContainers: Container[]
    containers: Container[]
    restartPolicy: "Always" | "OnFailure" | "Never"
    terminationGracePeriodSeconds: number
    dnsPolicy: "ClusterFirstWithHostNet" | "ClusterFirst" | "Default" | "None"
    nodeSelector: Record<string, string>
    serviceAccountName: string
    hostNetwork: boolean
    hostPID: boolean
    hostIPC: boolean
    shareProcessNamespace: boolean
    imagePullSecrets: string[]
    hostname: string
    affinity?: {
        nodeAffinity?: {}
        podAffinity?: {}
        podAntiAffinity?: {}
    }
    tolerations: {}
}

export type Container = {
    name: string
    image: string
    command: string[]
    args: string[]
    resources: {
        limits: ResourceList
        requests: ResourceList
    }
    volumeMounts: VolumeMount[]
    imagePullPolicy: "Always" | "Never" | "IfNotPresent"

    // TODO
    // livenessProbe: {}
    // readinessProbe: {}
}

export type ResourceList = {
    memory: string
    cpu: string
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
