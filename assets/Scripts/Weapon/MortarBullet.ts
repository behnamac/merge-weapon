import { _decorator, Component, find, ICollisionEvent, ITriggerEvent, Node, SphereCollider, Vec3 } from 'cc';
import { Bullet } from './Bullet';
import { EnemyHealth } from '../Enemy/EnemyHealth';
import { GameManager } from '../Manager/GameManager';
import { EnemySpawner } from '../Enemy/EnemySpawner';
const { ccclass, property } = _decorator;

@ccclass('MortarBullet')
export class MortarBullet extends Bullet {

    @property(Number)
    exploadRadius: number = 0

    OnCollisionAny(event: ICollisionEvent): void
    {
        var allEnemys = EnemySpawner.Instance._enemys;
        for (let i = 0; i < allEnemys.length; i++) {

            if(!allEnemys[i].active) continue
            if(Vec3.distance(allEnemys[i].worldPosition, this.node.worldPosition) <= this.exploadRadius)
            {
                allEnemys[i].getComponent(EnemyHealth).TakeDamage(this.Damage)
            }
        }

        this.node.destroy()
    }
}


