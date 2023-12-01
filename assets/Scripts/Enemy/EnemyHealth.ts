import { _decorator, Component, Node } from 'cc';
import { EnemySpawner } from './EnemySpawner';
const { ccclass, property } = _decorator;

@ccclass('EnemyHealth')
export class EnemyHealth extends Component {
    @property(Number)
    health: number = 100

    TakeDamage(value: number)
    {
        this.health -= value
        if(this.health <= 0)
        {
            this.Dead()
        }
    }
    Dead()
    {
        EnemySpawner.Instance.OnDeadEnemy()
        this.node.active = false
    }
}


