import click

from client import command as clients_commands

CLIENTS_TABLE = '.clients.csv'


@click.group()
@click.pass_context
def cli(ctx):
    ctx.obj = {}
    ctx.obj['clients_table'] = CLIENTS_TABLE


cli.add_command(clients_commands.all)
