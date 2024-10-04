// Part 1
const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    companion: {
      name: "Leo",
      type: "Cat",
      companion: {
        name: "Frank",
        type: "flea",
        inventory: ["hat", "sunglasses"],
      },
    },
    roll(mod = 0) {
      const result = Math.floor(Math.random() * 20) + 1 + mod;
      console.log(`${this.name} rolled a ${result}.`);
    },
  };
  adventurer.inventory.forEach((item) => {
    console.log(item);
  });
  adventurer.roll();
  adventurer.roll();
  adventurer.roll();
  adventurer.roll();
  
  // Part 2
  class Character {
    static MAX_HEALTH = 100;
    constructor(name) {
      this.name = name;
      this.health = Character.MAX_HEALTH;
      this.inventory = [];
    }
  }
  // const robin = new Character("Robin");
  // robin.inventory = ["sword", "potion", "artifact"];
  // robin.companion = new Character("Leo");
  // robin.companion.type = "Cat";
  // robin.companion.companion = new Character("Frank");
  // robin.companion.companion.type = "Flea";
  // robin.companion.companion.inventory = ["small hat", "sunglasses"];
  
  // Part 3 & 4
  class Adventurer extends Character {
    static ROLES = ["Fighter", "Healer", "Wizard"];
    constructor(name, role, companionName, companionType) {
      super(name);
      // Adventurers have specialized roles.
      if (Adventurer.ROLES.includes(role)) {
        this.role = role;
      } else {
        throw "Role not found";
      }
      // Every adventurer starts with a bed and 50 gold coins.
      this.inventory.push("bedroll", "50 gold coins");
      this.companion = new Companion(companionName, companionType);
    }
    // Adventurers have the ability to scout ahead of them.
    scout() {
      console.log(`${this.name} is scouting ahead...`);
      super.roll();
    }
    drop(item) {
      // new ability
      this.inventory = this.inventory.filter((obj) => {
        return obj !== item;
      });
    }
    heal() {
      this.health = this.MAX_HEALTH;
    }
    takeDamage(points) {
      this.health -= points;
      if (this.health <= 0) {
        this.die();
      }
    }
    die() {
      console.log(`${this.name} has died`);
    }
    roll(mod = 0) {
      const result = Math.floor(Math.random() * 20) + 1 + mod;
      console.log(`${this.name} rolled a ${result}.`);
      return result;
    }
    singleRound(adversary) {
      const selfRoll = this.roll();
      const adversaryRoll = adversary.roll();
      if (selfRoll > adversaryRoll) {
        adversary.takeDamage(1);
      } else {
        this.takeDamage(1);
      }
      console.log(
        `${this.name} Roll`,
        selfRoll,
        `${adversary.name} Roll`,
        adversaryRoll,
        `${this.name} Health`,
        this.health,
        `${adversary.name} Health`,
        adversary.health
      );
    }
    duel(adversary) {
      console.log(adversary);
      while (this.health > 50 && adversary.health > 50) {
        this.singleRound(adversary);
      }
    }
  }
  // const robin = new Adventurer("Robin", "archer");
  
  class Companion {
    constructor(name, type) {
      this.name = name;
      this.type = type;
      this.loyalty = 100;
    }
    takeLoyalty(points) {
      this.loyalty -= points;
    }
    healLoyalty() {
      this.loyalty = 100;
    }
  }
  // const robin = new Adventurer("Robin", "Fighter", "Leo", "cat");
  // console.log(robin);
  
  // Part 5
  class AdventurerFactory {
    constructor(role) {
      this.role = role;
      this.adventurers = [];
    }
    generate(name) {
      const newAdventurer = new Adventurer(name, this.role, "Bob", "cat");
      this.adventurers.push(newAdventurer);
    }
    findByIndex(index) {
      return this.adventurers[index];
    }
    findByName(name) {
      return this.adventurers.find((a) => a.name === name);
    }
  }
  
  const healers = new AdventurerFactory("Healer");
  const robin = healers.generate("Robin");
  const fighters = new AdventurerFactory("Fighter");
  const hood = fighters.generate("Hood");
  
  console.log(healers.findByName("Robin"));
  healers.findByName("Robin").duel(fighters.findByName("Hood"));