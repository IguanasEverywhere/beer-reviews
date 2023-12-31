"""Create beginning of user table

Revision ID: 268b48b68528
Revises: 6282d88df8a9
Create Date: 2023-11-06 10:47:31.379096

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '268b48b68528'
down_revision = '6282d88df8a9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # ### end Alembic commands ###
