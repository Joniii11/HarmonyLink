

export interface NodeStats {
    /**
     * The amount of players connected to the node
     */
    players: number;

    /**
     * The amount of players that are playing music
     */
    playingPlayers: number;
    
    /**
     * The uptime of the node
     */
    uptime: number;

    /**
     * The CPU usage of the node
     */
    cpu: {
        /**
         * The amount of CPU cores
         */
        cores: number;

        /**
         * The system load of the CPU
         */
        systemLoad: number;

        /**
         * The load of the Lavalink
         */
        lavalinkLoad: number;
    };

    /**
     * The memory usage of the node
     */
    memory: {
        /**
         * The amount of memory that is reservable
         */
        reservable: number;
        
        /**
         * The amount of memory that is used
         */
        used: number;
        
        /**
         * The amount of free memory
         */
        free: number;

        /**
         * The amount of memory that is allocated
         */
        allocated: number
    };

    /**
     * The frame stats of the node
     * @attention This is by default NOT included in LavaLink however in NodeLink it is
     */
    frameStats: {
        /**
         * The amount of frames sent
         */
        sent: number;

        /**
         * The amount of frames that have a deficit
         */
        deficit: number;

        /**
         * The amount of nulled frames
         */
        nulled: number
    };
};

export enum NodeType {
    LavaLinkV4 = "lavalinkv4",
    NodeLink = "nodelink",
    FrequenC = "frequenc"
};

export interface NodeGroup {
    /**
     * The name of the node group
     */
    name: string;

    /**
     * The URL or IP address of the node to connect to
     */
    host: string;

    /**
     * The password for authenticating with the node.
     *
     * @default "youshallnotpass"
     */
    password?: string;

    /**
     * The port number of the node.
     *
     * @default 2333
     */
    port?: number;

    /**
     * Indicates whether the node uses a secure connection (HTTPS).
     *
     * @default false
     */
    secure?: boolean;

    /**
     * The type of the node
     * 
     * @default NodeType.LavaLinkV4
     */
    type?: NodeType;
};