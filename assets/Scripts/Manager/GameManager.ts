import { _decorator, Component, Constructor, debug, director, instantiate, Node, Prefab, Scene, sys } from 'cc';
import { eventManager } from './EventManager';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    static Instance = null

    @property([Prefab])
    PrefabLevels = []
    @property(Node)
    LevelParent = null

    private _activeLevel: Node = null
    private _endGame: boolean = false
    onLoad()
    {
        GameManager.Instance = this
        this.SpawnLevel()
    }
    public LevelStart(): void
    {
        eventManager.dispatchEvent(new Event('OnLevelStart'));
    }
    public LevelCompelet(): void
    {
        if(this._endGame) return
        eventManager.dispatchEvent(new Event('OnLevelCompelet'));

        var levelIndex = 0
        levelIndex = sys.localStorage.getItem("LevelIndex")
        levelIndex++
        sys.localStorage.setItem("LevelIndex", levelIndex)
        this._endGame = true
    }
    public LevelFail(): void
    {
        if(this._endGame) return
        eventManager.dispatchEvent(new Event('OnLevelFail'));
        this._endGame = true
    }

    public ResetLevel(): void
    {
        this._activeLevel.destroy()
        UIManager.Instance.activePanel("Start");
        this._endGame = false
        eventManager.dispatchEvent(new Event('OnLevelReset'));
        this.SpawnLevel()
    }

    private SpawnLevel()
    {
        var level = this.GetLevel()
        var levelSpawned = instantiate(level)
        levelSpawned.parent = this.LevelParent
        this._activeLevel = levelSpawned
    }
    private GetLevel(): Node
    {
        var levelIndex = 0
        levelIndex = sys.localStorage.getItem("LevelIndex")

        if(levelIndex >= this.PrefabLevels.length)
        {
            levelIndex = 0
            sys.localStorage.setItem("LevelIndex",levelIndex)
        }
        return this.PrefabLevels[levelIndex]
    }
}

