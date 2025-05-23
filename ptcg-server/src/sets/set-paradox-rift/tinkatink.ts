import { PokemonCard } from '../../game/store/card/pokemon-card';
import { Stage, CardType } from '../../game/store/card/card-types';
import { StoreLike, State } from '../../game';
import { Effect } from '../../game/store/effects/effect';
import { AttackEffect } from '../../game/store/effects/game-effects';
import { ADD_MARKER, BLOCK_EFFECT_IF_MARKER, REMOVE_MARKER_AT_END_OF_TURN, REPLACE_MARKER_AT_END_OF_TURN, WAS_ATTACK_USED } from '../../game/store/prefabs/prefabs';

export class Tinkatink extends PokemonCard {

  public stage: Stage = Stage.BASIC;
  public cardType: CardType = P;
  public hp: number = 70;
  public weakness = [{ type: M }];
  public retreat = [C, C];

  public attacks = [
    {
      name: 'Boundless Power',
      cost: [P],
      damage: 40,
      text: 'During your next turn, this Pokémon can\'t attack.'
    }
  ];

  public set: string = 'PAR';
  public setNumber = '83';
  public cardImage = 'assets/cardback.png';
  public regulationMark: string = 'G';
  public name: string = 'Tinkatink';
  public fullName: string = 'Tinkatink PAR';

  // for preventing the pokemon from attacking on the next turn
  public readonly ATTACK_USED_MARKER = 'ATTACK_USED_MARKER';
  public readonly ATTACK_USED_2_MARKER = 'ATTACK_USED_2_MARKER';

  public reduceEffect(store: StoreLike, state: State, effect: Effect): State {

    if (effect instanceof AttackEffect)
      BLOCK_EFFECT_IF_MARKER(this.ATTACK_USED_2_MARKER, effect.player, this);

    if (WAS_ATTACK_USED(effect, 0, this))
      ADD_MARKER(this.ATTACK_USED_MARKER, effect.player, this);

    REMOVE_MARKER_AT_END_OF_TURN(effect, this.ATTACK_USED_2_MARKER, this);
    REPLACE_MARKER_AT_END_OF_TURN(effect, this.ATTACK_USED_MARKER, this.ATTACK_USED_2_MARKER, this);

    return state;
  }
}