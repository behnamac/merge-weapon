import { _decorator, Component, instantiate, Node, Prefab, randomRange, randomRangeInt, Vec3 } from 'cc';
import { eventManager } from '../Manager/EventManager';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('EnemySpawner')
export class EnemySpawner extends Component {
    static Instance: EnemySpawner

    @property(Node)
    spawnPoint: Node = null

    @property(Node)
    minPos: Node = null
    @property(Node)
    maxPos: Node = null

    @property([Prefab])
    enemys: Prefab[] = []

    @property(Number)
    maxNumberSpawn: number = 0
    @property(Number)
    delaySpawn: number = 0

    _currentDelaySpawn: number = 0
    _currentSpawnNumber: number = 0
    _deadNumber: number = 0
    _canSpawn: boolean = false

    _enemys: Node[] = []

    onLoad(): void {
        EnemySpawner.Instance = this
    }
    start()
    {
        eventManager.addEventListener("OnLevelStart", () => this.OnLevelStart());
        eventManager.addEventListener("OnLevelCompelet", () => this.OnLevelCompelet());
        eventManager.addEventListener("OnLevelFail", () => this.OnLevelFail());
    }
    onDestroy() {
        eventManager.removeEventListener("OnLevelStart", () => this.OnLevelStart());
        eventManager.removeEventListener("OnLevelCompelet", () => this.OnLevelCompelet());
        eventManager.removeEventListener("OnLevelFail", () => this.OnLevelFail());
    }

    update(deltaTime: number)
    {
        if(!this._canSpawn) return
        if(this._currentSpawnNumber >= this.maxNumberSpawn) return

        this._currentDelaySpawn -= deltaTime
        if(this._currentDelaySpawn > 0) return

        this.SpawnEnemy()
    }
    SpawnEnemy()
    {
        var enemy = this.GetEnemy()
        var point = this.GetSpawnPoint()

        var enemySpawned = instantiate(enemy)
        enemySpawned.parent = this.spawnPoint
        enemySpawned.position = point
        this._enemys.push(enemySpawned)

        this._currentDelaySpawn = this.delaySpawn
        this._currentSpawnNumber++
    }
    OnDeadEnemy()
    {
        this._deadNumber++
        if(this._deadNumber >= this.maxNumberSpawn)
        {
            GameManager.Instance.LevelCompelet()
        }
    }

    GetEnemy(): Prefab
    {
        var randomIndex = randomRangeInt(0, this.enemys.length)
        return this.enemys[randomIndex]
    }

    GetSpawnPoint(): Vec3
    {
        var randomX = randomRange(this.minPos.position.x, this.maxPos.position.x)
        var randomZ = randomRange(this.minPos.position.z, this.maxPos.position.z)
        var y = this.spawnPoint.position.y

        return new Vec3(randomX, y, randomZ)
    }


    OnLevelStart()
    {
        this._canSpawn = true
    }
    OnLevelCompelet()
    {
        this._canSpawn = false
    }
    OnLevelFail()
    {
        this._canSpawn = false
    }
}


