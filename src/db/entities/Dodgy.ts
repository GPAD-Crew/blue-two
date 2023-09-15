import { BaseEntity, PrimaryColumn, Entity, Like } from "typeorm";
import { safeFilter } from "~/helpers";

@Entity()
export class Dodgy extends BaseEntity {
    @PrimaryColumn()
    psn: string;

    static async checkMany(friends: string[]): Promise<string[]> {
        const dodgy = await Promise.all(
            friends.map((friend) => this.checkOne(friend)),
        );

        return safeFilter(dodgy).map(({ psn }) => psn);
    }

    static async checkOne(psn: string): Promise<Dodgy | null> {
        const dodgy = await this.findOne({ where: { psn: Like(psn) } });

        return dodgy;
    }
}
