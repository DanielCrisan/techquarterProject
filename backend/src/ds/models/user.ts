import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Length(4, 20)
  @Column({ unique: true })
  username!: string;

  @Column()
  @Length(4, 100)
  password!: string;

  @Column()
  firstName: string = '';

  @Column()
  middleName: string = '';

  @Column()
  lastName: string = '';

  @Column()
  email: string = '';

  @Column()
  phoneNumber: string = '';

  @Column()
  fax: string = '';

  @Column()
  address: string = '';

  @Column()
  city: string = '';

  @Column()
  state: string = '';

  @Column()
  zipCode: string = '';

  @Column()
  country: string = '';

  constructor(username: string, password: string, city: string, state: string, country: string) {
    this.username = username;
    this.password = password;
    this.firstName = username;
    this.middleName = username;
    this.lastName = username;
    this.email = username;
    this.phoneNumber = username;
    this.fax = username;
    this.address = username;
    this.city = city;
    this.state = state;
    this.zipCode = username;
    this.country = country;
  }
}
