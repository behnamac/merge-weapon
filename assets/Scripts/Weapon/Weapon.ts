import { _decorator, Component, instantiate, Node, Prefab, RigidBody } from 'cc';
import { Bullet } from './Bullet';
const { ccclass, property } = _decorator;

@ccclass('Weapon')
export class Weapon extends Component {
    @property(Node)
    shootPoint: Node = null

    @property(Prefab)
    bullet: Prefab = null

    @property(Node)
    bulletParent: Node = null

    @property(Number)
    delayShoot: number = 0

    @property(Number)
    damage: number = 0

    _currentDelayShoot: number = 0
    _lastBullet: Bullet

    ActiveShoot(deltaTime: number)
    {
        this._currentDelayShoot -= deltaTime
        if(this._currentDelayShoot <= 0)
        {
            this.Shoot()
        }
    }

    Shoot()
    {
        this._currentDelayShoot = this.delayShoot

        var bulletSpawned = instantiate(this.bullet)
        bulletSpawned.parent = this.bulletParent
        
        bulletSpawned.worldPosition = this.shootPoint.worldPosition

        this._lastBullet = bulletSpawned.getComponent(Bullet)
    }
}


